import { cache } from 'react';
import { revalidateInterval } from '../../../../../global-settings.js';
import { notFound } from 'next/navigation';
import CollectionSingle from '../../../../../templates/CollectionSingle';

const SHOPIFY_STORE_DOMAIN =
    'andersons-general-store-statesboro.myshopify.com';

const SHOPIFY_API_VERSION = '2026-07';

const SHOPIFY_STOREFRONT_ENDPOINT =
    `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

/*
 * Set this to an array to restrict which collection routes are allowed:
 *
 * const ALLOWED_COLLECTION_HANDLES = ['hats', 'misc', 'tops'];
 *
 * Leave it null to allow every collection published to the
 * Headless storefront.
 */
const ALLOWED_COLLECTION_HANDLES = null;

/*
 * Shared Storefront API request helper.
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

  const responseText = await response.text();

  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error(
        `Shopify returned an invalid JSON response: ` +
        `${response.status} ${response.statusText}\n` +
        responseText
    );
  }

  if (!response.ok) {
    throw new Error(
        `Shopify request failed: ` +
        `${response.status} ${response.statusText}\n` +
        JSON.stringify(result, null, 2)
    );
  }

  if (result.errors?.length) {
    throw new Error(
        `Shopify GraphQL error:\n` +
        JSON.stringify(result.errors, null, 2)
    );
  }

  return result.data;
}

/*
 * Product fields used by both the collection query and the
 * all-products query.
 */
const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  descriptionHtml
  vendor
  productType
  tags
  availableForSale

  seo {
    title
    description
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
`;

/*
 * Fetches every collection published to the Headless
 * storefront.
 */
const ALL_COLLECTIONS_QUERY = `
  query AllCollections($after: String) {
    collections(
      first: 250
      after: $after
      sortKey: TITLE
    ) {
      nodes {
        id
        title
        handle
        description
        descriptionHtml

        seo {
          title
          description
        }

        image {
          url
          altText
          width
          height
        }
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/*
 * Fetches one collection by its Shopify handle, along with
 * its products.
 */
const SINGLE_COLLECTION_QUERY = `
  query CollectionByHandle(
    $handle: String!
    $after: String
  ) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml

      seo {
        title
        description
      }

      image {
        url
        altText
        width
        height
      }

      products(
        first: 250
        after: $after
        sortKey: COLLECTION_DEFAULT
      ) {
        nodes {
          ${PRODUCT_FIELDS}
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

/*
 * Preserves your existing allProducts prop by fetching every
 * product visible to the Headless storefront.
 */
const ALL_PRODUCTS_QUERY = `
  query AllProducts($after: String) {
    products(
      first: 250
      after: $after
      sortKey: TITLE
    ) {
      nodes {
        ${PRODUCT_FIELDS}
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/*
 * General mapping helpers.
 */
function getIdFromGid(gid) {
  if (!gid) {
    return null;
  }

  return gid.split('/').pop();
}

function mapImage(
    image,
    {
      position = 1,
      variantIds = [],
      fallbackAlt = '',
    } = {}
) {
  if (!image?.url) {
    return null;
  }

  const alt =
      image.altText ||
      fallbackAlt ||
      '';

  return {
    src: image.url,
    url: image.url,
    alt,
    altText: alt,
    width: image.width || null,
    height: image.height || null,
    position,

    /*
     * Old REST/Ajax product responses included this property.
     * Keeping it makes these objects compatible with older
     * components that still expect it.
     */
    variant_ids: variantIds,
  };
}

function mapCollectionToLegacyShape(collection) {
  if (!collection) {
    return null;
  }

  return {
    id: getIdFromGid(collection.id),
    title: collection.title,
    handle: collection.handle,

    description:
        collection.description || '',

    description_html:
        collection.descriptionHtml || '',

    body_html:
        collection.descriptionHtml || '',

    image: collection.image
        ? mapImage(collection.image, {
          fallbackAlt: collection.title,
        })
        : null,

    seo:
        collection.seo || null,
  };
}

/*
 * Converts a Storefront API product into an older REST-like
 * shape so CollectionSingle does not need to be completely
 * rewritten.
 */
function mapProductToLegacyShape(product) {
  const storefrontVariants =
      product.variants?.nodes || [];

  const productImageNodes =
      product.images?.nodes || [];

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

          title:
              variant.title || 'Default Title',

          position: index + 1,

          sku:
              variant.sku || '',

          available:
              Boolean(variant.availableForSale),

          availableForSale:
              Boolean(variant.availableForSale),

          price:
              variant.price?.amount || '0.00',

          currency_code:
              variant.price?.currencyCode || 'USD',

          compare_at_price:
              variant.compareAtPrice?.amount || null,

          option1,
          option2,
          option3,

          selected_options:
          selectedOptions,

          featured_image:
              variant.image
                  ? mapImage(variant.image, {
                    variantIds: [
                      getIdFromGid(variant.id),
                    ],

                    fallbackAlt:
                        option2 ||
                        variant.title ||
                        product.title,
                  })
                  : null,
        };
      }
  );

  /*
   * Map each gallery image and associate it with variants
   * that use that image.
   */
  const images = productImageNodes
      .map((image, index) => {
        const matchingVariantIds =
            storefrontVariants
                .filter(
                    (variant) =>
                        variant.image?.url === image.url
                )
                .map(
                    (variant) =>
                        getIdFromGid(variant.id)
                );

        /*
         * Products and variants sometimes do not have a direct
         * image association. Associate the first product image
         * with image-less variants as a fallback.
         */
        const fallbackVariantIds =
            index === 0
                ? storefrontVariants
                    .filter(
                        (variant) =>
                            !variant.image?.url
                    )
                    .map(
                        (variant) =>
                            getIdFromGid(variant.id)
                    )
                : [];

        return mapImage(image, {
          position: index + 1,

          variantIds: Array.from(
              new Set([
                ...matchingVariantIds,
                ...fallbackVariantIds,
              ])
          ),

          fallbackAlt: product.title,
        });
      })
      .filter(Boolean);

  /*
   * If featuredImage is not already represented in images,
   * add it as the first image.
   */
  if (
      product.featuredImage?.url &&
      !images.some(
          (image) =>
              image.src === product.featuredImage.url
      )
  ) {
    const imageLessVariantIds =
        storefrontVariants
            .filter(
                (variant) =>
                    !variant.image?.url
            )
            .map(
                (variant) =>
                    getIdFromGid(variant.id)
            );

    const featuredImage = mapImage(
        product.featuredImage,
        {
          position: 1,
          variantIds: imageLessVariantIds,
          fallbackAlt: product.title,
        }
    );

    images.unshift(featuredImage);

    /*
     * Correct positions after inserting at the beginning.
     */
    images.forEach((image, index) => {
      image.position = index + 1;
    });
  }

  /*
   * Final image fallback for a variant that has its own image
   * but that image is not present in the product gallery.
   */
  storefrontVariants.forEach((variant) => {
    if (!variant.image?.url) {
      return;
    }

    const variantId =
        getIdFromGid(variant.id);

    const existingImage =
        images.find(
            (image) =>
                image.src === variant.image.url
        );

    if (existingImage) {
      if (
          !existingImage.variant_ids.includes(
              variantId
          )
      ) {
        existingImage.variant_ids.push(
            variantId
        );
      }

      return;
    }

    const mappedVariantImage =
        mapImage(variant.image, {
          position: images.length + 1,
          variantIds: [variantId],
          fallbackAlt:
              variant.title ||
              product.title,
        });

    if (mappedVariantImage) {
      images.push(mappedVariantImage);
    }
  });

  const primaryImage =
      images[0] ||
      mapImage(product.featuredImage, {
        fallbackAlt: product.title,
      }) ||
      null;

  return {
    id: getIdFromGid(product.id),

    title:
    product.title,

    handle:
    product.handle,

    body_html:
        product.descriptionHtml || '',

    description:
        product.description || '',

    descriptionHtml:
        product.descriptionHtml || '',

    vendor:
        product.vendor || '',

    product_type:
        product.productType || '',

    tags: Array.isArray(product.tags)
      ? product.tags.join(',')
      : product.tags || '',

    available:
        Boolean(product.availableForSale),

    availableForSale:
        Boolean(product.availableForSale),

    options:
        (product.options || []).map(
            (option, index) => ({
              name: option.name,
              position: index + 1,
              values: option.values || [],
            })
        ),

    variants,
    images,

    /*
     * Older components commonly expect:
     *
     * product.image.src
     */
    image:
    primaryImage,

    featured_image:
        primaryImage?.src || null,

    seo:
        product.seo || null,
  };
}

/*
 * Returns true when no restriction is configured, or when the
 * requested collection is included in the configured list.
 */
function collectionHandleIsAllowed(handle) {
  if (!Array.isArray(ALLOWED_COLLECTION_HANDLES)) {
    return true;
  }

  return ALLOWED_COLLECTION_HANDLES.includes(
      handle
  );
}

/*
 * Fetch all collections with cursor pagination.
 */
const getAllCollections = cache(async () => {
  const collections = [];

  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data =
        await shopifyStorefrontFetch(
            ALL_COLLECTIONS_QUERY,
            {
              after,
            }
        );

    const connection =
        data.collections;

    const pageCollections =
        connection?.nodes || [];

    collections.push(
        ...pageCollections
            .filter((collection) =>
                collectionHandleIsAllowed(
                    collection.handle
                )
            )
            .map(
                mapCollectionToLegacyShape
            )
    );

    hasNextPage =
        Boolean(
            connection?.pageInfo?.hasNextPage
        );

    after =
        connection?.pageInfo?.endCursor ||
        null;
  }

  return {
    collections,
  };
});

/*
 * Fetch one collection and all of the products inside it.
 */
const getSingleCollection = cache(
    async (handle) => {
      if (!handle) {
        console.error(
            'getSingleCollection was called without a collection handle.'
        );

        return null;
      }

      if (!collectionHandleIsAllowed(handle)) {
        console.error(
            `Collection handle is not allowed: ${handle}`
        );

        return null;
      }

      const products = [];

      let collectionData = null;
      let after = null;
      let hasNextPage = true;

      while (hasNextPage) {
        const data =
            await shopifyStorefrontFetch(
                SINGLE_COLLECTION_QUERY,
                {
                  handle,
                  after,
                }
            );

        if (!data.collection) {
          console.error(
              `Shopify collection was not found or is not published ` +
              `to the Headless storefront: ${handle}`
          );

          return null;
        }

        if (!collectionData) {
          collectionData =
              mapCollectionToLegacyShape(
                  data.collection
              );
        }

        const connection =
            data.collection.products;

        const pageProducts =
            connection?.nodes || [];

        products.push(
            ...pageProducts.map(
                mapProductToLegacyShape
            )
        );

        hasNextPage =
            Boolean(
                connection?.pageInfo?.hasNextPage
            );

        after =
            connection?.pageInfo?.endCursor ||
            null;
      }

      console.log(
          'Shopify collection lookup result:',
          {
            requestedHandle: handle,
            returnedHandle:
            collectionData?.handle,
            title:
            collectionData?.title,
            productCount:
            products.length,
          }
      );

      return {
        collection:
        collectionData,

        products,
      };
    }
);

/*
 * Fetch all published products so the existing allProducts
 * prop remains available.
 */
const getAllProducts = cache(async () => {
  const products = [];

  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data =
        await shopifyStorefrontFetch(
            ALL_PRODUCTS_QUERY,
            {
              after,
            }
        );

    const connection =
        data.products;

    const pageProducts =
        connection?.nodes || [];

    products.push(
        ...pageProducts.map(
            mapProductToLegacyShape
        )
    );

    hasNextPage =
        Boolean(
            connection?.pageInfo?.hasNextPage
        );

    after =
        connection?.pageInfo?.endCursor ||
        null;
  }

  return {
    products,
  };
});

/*
 * Collection page.
 */
export default async function Page({
                                     params,
                                   }) {
  /*
   * Current Next.js App Router versions provide params as
   * a Promise.
   */
  const { handle } = await params;

  const [
    collectionResult,
    allCollectionsResult,
    allProductsResult,
  ] = await Promise.all([
    getSingleCollection(handle),
    getAllCollections(),
    getAllProducts(),
  ]);

  if (!collectionResult) {
    console.error(
        `Rendering 404 because Shopify returned no collection: ${handle}`
    );

    notFound();
  }

  /*
   * This preserves your old route's behavior of returning a
   * 404 when the collection exists but contains no products.
   *
   * Remove this condition if you would rather display an
   * empty collection page.
   */
  if (collectionResult.products.length === 0) {
    console.error(
        `Rendering 404 because the collection has no published products: ${handle}`
    );

    notFound();
  }

  return (
      <CollectionSingle
          productData={
            collectionResult.products
          }

          allProducts={
            allProductsResult.products
          }

          collectionData={
            allCollectionsResult.collections
          }
      />
  );
}

/*
 * Generate every published collection route during build.
 */
export async function generateStaticParams() {
  const collectionsResult =
      await getAllCollections();

  return collectionsResult.collections.map(
      (collection) => ({
        handle: collection.handle,
      })
  );
}

/*
 * Collection metadata.
 */
export async function generateMetadata({
                                         params,
                                       }) {
  const { handle } = await params;

  const collectionResult =
      await getSingleCollection(handle);

  if (!collectionResult) {
    return {};
  }

  const collection =
      collectionResult.collection;

  const title =
      collection.seo?.title ||
      collection.title ||
      'Products';

  const description =
      collection.seo?.description ||
      collection.description ||
      `Shop ${collection.title} from Anderson's General Store`;

  const imageUrl =
      collection.image?.src || null;

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
                  collection.image?.alt ||
                  collection.title,
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