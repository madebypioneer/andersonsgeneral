import { cache } from 'react';
import { revalidateInterval } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import ProductSingle from '../../../../templates/ProductSingle';

const SHOPIFY_STORE_DOMAIN =
    'andersons-general-store-statesboro.myshopify.com';

const SHOPIFY_API_VERSION = '2026-07';

const SHOPIFY_STOREFRONT_ENDPOINT =
    `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const ALLOWED_COLLECTION_HANDLES = [
  'hats',
  'misc',
  'tops',
];

/*
 * Shopify request helper
 */
async function shopifyStorefrontFetch(query, variables = {}) {
  const token =
      process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

  if (!token) {
    throw new Error(
        'Missing SHOPIFY_STOREFRONT_PRIVATE_TOKEN environment variable.'
    );
  }

  const response = await fetch(
      SHOPIFY_STOREFRONT_ENDPOINT,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Shopify-Storefront-Private-Token': token,
        },

        body: JSON.stringify({
          query,
          variables,
        }),

        next: {
          revalidate: revalidateInterval,
        },
      }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    const responseText = await response.text();

    throw new Error(
        `Shopify returned an invalid response: ` +
        `${response.status} ${response.statusText}\n` +
        responseText
    );
  }

  if (!response.ok) {
    throw new Error(
        `Shopify request failed: ` +
        `${response.status} ${response.statusText}\n` +
        JSON.stringify(result)
    );
  }

  if (result.errors?.length) {
    throw new Error(
        `Shopify GraphQL error:\n${JSON.stringify(
            result.errors,
            null,
            2
        )}`
    );
  }

  return result.data;
}

/*
 * Queries
 */
const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts(
    $handle: String!
    $after: String
  ) {
    collection(handle: $handle) {
      id
      title
      handle

      products(
        first: 250
        after: $after
      ) {
        nodes {
          id
          handle
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const SINGLE_PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      vendor
      productType
      tags
      availableForSale

      seo {
        title
        description
      }

      collections(first: 250) {
        nodes {
          id
          title
          handle
        }
      }

      featuredImage {
        url
        altText
        width
        height
      }

      images(first: 250) {
        nodes {
          url
          altText
          width
          height
        }
      }

      options {
        name
        values
      }

      variants(first: 250) {
        nodes {
          id
          title
          sku
          availableForSale

          selectedOptions {
            name
            value
          }

          price {
            amount
            currencyCode
          }

          compareAtPrice {
            amount
            currencyCode
          }

          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

/*
 * General helpers
 */
function getIdFromGid(gid) {
  if (!gid) {
    return null;
  }

  return gid.split('/').pop();
}

function normalizeText(value) {
  return String(value || '')
      .trim()
      .toLowerCase();
}

function stripHtml(html = '') {
  return html
      .replace(/<style[^>]*>.*?<\/style>/gis, ' ')
      .replace(/<script[^>]*>.*?<\/script>/gis, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
}

function mapImage(
    image,
    {
      position = 1,
      alt = null,
      variantIds = [],
    } = {}
) {
  if (!image?.url) {
    return null;
  }

  return {
    src: image.url,
    url: image.url,

    alt:
        alt ||
        image.altText ||
        '',

    altText:
        alt ||
        image.altText ||
        '',

    width: image.width || null,
    height: image.height || null,
    position,

    /*
     * ProductSingle expects this old REST API field.
     */
    variant_ids: variantIds,
  };
}

/*
 * Converts the GraphQL Storefront API product into the older
 * Shopify REST/Ajax-style shape that ProductSingle expects.
 */
function mapProductToLegacyShape(product) {
  const storefrontVariants =
      product.variants?.nodes || [];

  const productImageNodes =
      product.images?.nodes || [];

  const fallbackImage =
      product.featuredImage ||
      productImageNodes[0] ||
      null;

  const variants = storefrontVariants.map(
      (variant, index) => {
        const selectedOptions =
            variant.selectedOptions || [];

        const option1 =
            selectedOptions[0]?.value || null;

        const option2 =
            selectedOptions[1]?.value || null;

        const option3 =
            selectedOptions[2]?.value || null;

        return {
          id: getIdFromGid(variant.id),
          product_id: getIdFromGid(product.id),

          title: variant.title,
          position: index + 1,
          sku: variant.sku || '',

          available:
          variant.availableForSale,

          availableForSale:
          variant.availableForSale,

          price:
              variant.price?.amount || '0.00',

          currency_code:
              variant.price?.currencyCode || 'USD',

          compare_at_price:
              variant.compareAtPrice?.amount ||
              null,

          option1,
          option2,
          option3,

          selected_options:
          selectedOptions,

          featured_image:
              variant.image
                  ? mapImage(variant.image, {
                    alt:
                        option2 ||
                        variant.title,
                    variantIds: [
                      getIdFromGid(variant.id),
                    ],
                  })
                  : null,
        };
      }
  );

  /*
   * ProductSingle expects each image to contain variant_ids
   * and expects the image alt text to match either:
   *
   *   variant.title
   *   variant.option2
   *
   * This creates image records that satisfy that structure.
   */
  const images = [];
  const imageKeys = new Set();

  storefrontVariants.forEach(
      (variant, variantIndex) => {
        const variantId =
            getIdFromGid(variant.id);

        const selectedOptions =
            variant.selectedOptions || [];

        const option2 =
            selectedOptions[1]?.value || null;

        const variantLabel =
            option2 ||
            variant.title ||
            product.title;

        const normalizedVariantTitle =
            normalizeText(variant.title);

        const normalizedVariantLabel =
            normalizeText(variantLabel);

        let matchingImages =
            productImageNodes.filter((image) => {
              const normalizedImageAlt =
                  normalizeText(image.altText);

              const matchesVariantImage =
                  Boolean(
                      variant.image?.url &&
                      image.url === variant.image.url
                  );

              const matchesVariantTitle =
                  Boolean(
                      normalizedImageAlt &&
                      normalizedImageAlt ===
                      normalizedVariantTitle
                  );

              const matchesVariantLabel =
                  Boolean(
                      normalizedImageAlt &&
                      normalizedImageAlt ===
                      normalizedVariantLabel
                  );

              return (
                  matchesVariantImage ||
                  matchesVariantTitle ||
                  matchesVariantLabel
              );
            });

        /*
         * A product with one variant should be able to display
         * its complete image gallery.
         */
        if (
            storefrontVariants.length === 1 &&
            productImageNodes.length
        ) {
          matchingImages = productImageNodes;
        }

        /*
         * If Shopify did not associate any gallery images with
         * the variant, use the variant image.
         */
        if (
            matchingImages.length === 0 &&
            variant.image
        ) {
          matchingImages = [variant.image];
        }

        /*
         * Final fallback so every variant has a renderable image.
         */
        if (
            matchingImages.length === 0 &&
            fallbackImage
        ) {
          matchingImages = [fallbackImage];
        }

        matchingImages.forEach(
            (image, imageIndex) => {
              const key =
                  `${variantId}:${image.url}`;

              if (imageKeys.has(key)) {
                return;
              }

              imageKeys.add(key);

              const mappedImage = mapImage(
                  image,
                  {
                    position:
                        images.length + 1,

                    /*
                     * ProductSingle filters thumbnails using
                     * item.title or item.option2.
                     */
                    alt: variantLabel,

                    variantIds: [variantId],
                  }
              );

              if (mappedImage) {
                images.push(mappedImage);
              }
            }
        );
      }
  );

  /*
   * Protect against a product that has images but no variants
   * returned for some unexpected reason.
   */
  if (
      images.length === 0 &&
      fallbackImage
  ) {
    const firstVariantId =
        variants[0]?.id || null;

    const mappedFallbackImage =
        mapImage(fallbackImage, {
          alt:
              variants[0]?.option2 ||
              variants[0]?.title ||
              product.title,

          variantIds:
              firstVariantId
                  ? [firstVariantId]
                  : [],
        });

    if (mappedFallbackImage) {
      images.push(mappedFallbackImage);
    }
  }

  const primaryImage =
      images[0] ||
      mapImage(fallbackImage) ||
      null;

  return {
    id: getIdFromGid(product.id),

    title: product.title,
    handle: product.handle,

    body_html:
        product.descriptionHtml || '',

    descriptionHtml:
        product.descriptionHtml || '',

    vendor:
        product.vendor || '',

    product_type:
        product.productType || '',

    tags:
        product.tags || [],

    available:
    product.availableForSale,

    options:
        (product.options || []).map(
            (option, index) => ({
              name: option.name,
              position: index + 1,
              values: option.values,
            })
        ),

    variants,
    images,

    /*
     * ProductSingle expects productData.image.src.
     */
    image: primaryImage,

    featured_image:
        primaryImage?.src || null,

    seo:
        product.seo || null,
  };
}

/*
 * Collection functions
 */
async function getProductsByCollection(
    collectionHandle
) {
  const products = [];

  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data =
        await shopifyStorefrontFetch(
            COLLECTION_PRODUCTS_QUERY,
            {
              handle: collectionHandle,
              after,
            }
        );

    if (!data.collection) {
      console.warn(
          `Shopify collection was not found or is not published ` +
          `to the Headless storefront: ${collectionHandle}`
      );

      return [];
    }

    const collectionProducts =
        data.collection.products.nodes || [];

    products.push(...collectionProducts);

    hasNextPage =
        data.collection.products.pageInfo
            .hasNextPage;

    after =
        data.collection.products.pageInfo
            .endCursor;
  }

  return products;
}

async function getAllProducts() {
  const collectionProductGroups =
      await Promise.all(
          ALLOWED_COLLECTION_HANDLES.map(
              (collectionHandle) =>
                  getProductsByCollection(
                      collectionHandle
                  )
          )
      );

  const products =
      collectionProductGroups.flat();

  const uniqueProducts =
      Array.from(
          new Map(
              products.map((product) => [
                product.handle,
                product,
              ])
          ).values()
      );

  return {
    products: uniqueProducts,
  };
}

/*
 * Individual product function
 *
 * React cache prevents Page and generateMetadata from
 * performing duplicate product requests during one render.
 */
const getSingleProduct = cache(
    async (handle) => {
      if (!handle) {
        console.error(
            'getSingleProduct was called without a product handle.'
        );

        return null;
      }

      console.log(
          `Looking up Shopify product: ${handle}`
      );

      const data =
          await shopifyStorefrontFetch(
              SINGLE_PRODUCT_QUERY,
              {
                handle,
              }
          );

      if (!data.product) {
        console.error(
            `Shopify product was not found or is not published ` +
            `to the Headless storefront: ${handle}`
        );

        return null;
      }

      const collectionHandles =
          (
              data.product.collections?.nodes ||
              []
          ).map(
              (collection) =>
                  collection.handle
          );

      console.log(
          'Shopify product lookup result:',
          {
            requestedHandle: handle,
            returnedHandle:
            data.product.handle,
            collectionHandles,
          }
      );

      return {
        product:
            mapProductToLegacyShape(
                data.product
            ),

        collectionHandles,

        seo:
            data.product.seo || null,
      };
    }
);

function productIsAllowed(productResult) {
  if (!productResult) {
    return false;
  }

  return productResult.collectionHandles.some(
      (collectionHandle) =>
          ALLOWED_COLLECTION_HANDLES.includes(
              collectionHandle
          )
  );
}

/*
 * Product page
 */
export default async function Page({
                                     params,
                                   }) {
  /*
   * Current Next.js App Router versions provide params
   * as a Promise.
   */
  const { handle } = await params;

  const productResult =
      await getSingleProduct(handle);

  if (!productResult) {
    console.error(
        `Rendering 404 because Shopify returned no product: ${handle}`
    );

    notFound();
  }

  if (!productIsAllowed(productResult)) {
    console.error(
        'Rendering 404 because the product is not in an allowed collection:',
        {
          handle,
          productCollections:
          productResult.collectionHandles,

          allowedCollections:
          ALLOWED_COLLECTION_HANDLES,
        }
    );

    notFound();
  }

  return (
      <ProductSingle
          productData={
            productResult.product
          }
      />
  );
}

/*
 * Product routes generated during next build.
 *
 * Dynamic product routes remain allowed by default, so a route
 * that was not returned here can still render on demand.
 */
export async function generateStaticParams() {
  const products =
      await getAllProducts();

  return products.products.map(
      (product) => ({
        handle: product.handle,
      })
  );
}

/*
 * Product metadata
 */
export async function generateMetadata({
                                         params,
                                       }) {
  const { handle } = await params;

  const productResult =
      await getSingleProduct(handle);

  if (
      !productResult ||
      !productIsAllowed(productResult)
  ) {
    return {};
  }

  const product =
      productResult.product;

  const title =
      productResult.seo?.title ||
      product.title;

  const description =
      productResult.seo?.description ||
      stripHtml(
          product.body_html
      );

  const imageUrl =
      product.image?.src || null;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      locale: 'en_US',
      type: 'website',

      images: imageUrl
          ? [
            {
              url: imageUrl,
              alt:
                  product.image?.alt ||
                  product.title,
            },
          ]
          : [],
    },

    twitter: {
      card: imageUrl
          ? 'summary_large_image'
          : 'summary',

      title,
      description,

      images: imageUrl
          ? [imageUrl]
          : [],
    },
  };
}