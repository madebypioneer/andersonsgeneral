import {
  apiUrl,
  builtCollectionHandles,
  revalidateInterval,
} from '../../../global-settings.js';
import { notFound } from 'next/navigation';
import ThankYou from "../../../templates/ThankYou.js";
import Cart from "../../../templates/Cart.js";
import ClothingPage from "../../../templates/ClothingPage.js";
import OutdoorsPage from "../../../templates/OutdoorsPage.js";
import ShopCategoryPage from "../../../templates/ShopCategoryPage.js";
import ShopParent from "../../../templates/ShopParent.js";
import About from "../../../templates/About.js";
import Contact from "../../../templates/Contact.js";
import CorporateBoot from "../../../templates/CorporateBoot.js";
import Apply from "../../../templates/Apply.js";
import Policy from "../../../templates/Policy.js";
import FootwearParent from "../../../templates/FootwearParent.js";

const SHOPIFY_STORE_DOMAIN =
    'andersons-general-store-statesboro.myshopify.com';

const SHOPIFY_API_VERSION = '2026-07';

const SHOPIFY_STOREFRONT_ENDPOINT =
    `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const CART_COLLECTION_PRODUCTS_QUERY = `
  query CartCollectionProducts(
    $handle: String!
    $after: String
  ) {
    collection(handle: $handle) {
      products(first: 250, after: $after) {
        nodes {
          title
          handle

          featuredImage {
            url
            altText
          }

          images(first: 250) {
            nodes {
              url
              altText
            }
          }

          variants(first: 250) {
            nodes {
              id
              title
              availableForSale

              selectedOptions {
                name
                value
              }

              price {
                amount
                currencyCode
              }

              image {
                url
                altText
              }
            }
          }
        }

        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function getCartVariantImage(product, variant) {
  if (variant.image?.url) {
    return variant.image;
  }

  const variantLabels = new Set(
      [
        variant.title,
        ...(variant.selectedOptions || []).map(
            (option) => option.value
        ),
      ].map(normalizeText)
  );

  return (
    (product.images?.nodes || []).find(
        (image) =>
          image?.url &&
          variantLabels.has(
              normalizeText(image.altText)
          )
    ) ||
    product.featuredImage ||
    null
  );
}

async function getCollectionCartItems(collectionHandle) {
  const token =
      process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

  if (!token) {
    throw new Error(
        'Missing SHOPIFY_STOREFRONT_PRIVATE_TOKEN environment variable.'
    );
  }

  const cartItems = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
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
            query: CART_COLLECTION_PRODUCTS_QUERY,
            variables: {
              handle: collectionHandle,
              after,
            },
          }),
          next: {
            revalidate: revalidateInterval,
          },
        }
    );

    const result = await response.json();

    if (!response.ok || result.errors?.length) {
      throw new Error(
          `Unable to build the cart catalog for ${collectionHandle}: ` +
          JSON.stringify(result.errors || response.statusText)
      );
    }

    const connection =
        result.data?.collection?.products;

    if (!connection) {
      throw new Error(
          `Shopify collection was not found: ${collectionHandle}`
      );
    }

    (connection.nodes || []).forEach((product) => {
      (product.variants?.nodes || []).forEach((variant) => {
        const image = getCartVariantImage(
            product,
            variant
        );

        cartItems.push({
          id: variant.id.split('/').pop(),
          title: product.title || '',
          handle: product.handle || '',
          variantTitle: variant.title || '',
          price: variant.price?.amount || '0.00',
          currencyCode:
              variant.price?.currencyCode || 'USD',
          image: image?.url || '',
          imageAlt:
              image?.altText || product.title || '',
          availableForSale:
              Boolean(variant.availableForSale),
        });
      });
    });

    hasNextPage = Boolean(
        connection.pageInfo?.hasNextPage
    );
    after = connection.pageInfo?.endCursor || null;
  }

  return cartItems;
}

async function getCartProductCatalog() {
  const collectionItems = await Promise.all(
      builtCollectionHandles.map(
          getCollectionCartItems
      )
  );

  return Array.from(
      new Map(
          collectionItems
              .flat()
              .map((item) => [item.id, item])
      ).values()
  );
}

async function getAllPages() {
  const res = await fetch(apiUrl + `/pages/all`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSinglePage(slug) {
  const res = await fetch(apiUrl + `/pages/all/${slug}`, {next: {revalidate: revalidateInterval}})
  if (!res.ok) {
    return notFound();
  } 
  else if (slug == "home" || slug == "404-2" || res == "404") {
    return notFound();
  } else {
    return res.json();
  }
}

export default async function Page({ params: { slug } }) {
  
  const _page = getSinglePage(slug);
  const page = await _page;

  if (page.response === '404') return notFound();

  if (page.template == "templates/thank-you.php") {
    return (
      <ThankYou pageData={page} />
    );
  } else if (page.template == "templates/cart.php") {
    const productCatalog =
        await getCartProductCatalog();

    return (
      <Cart
        pageData={page}
        productCatalog={productCatalog}
      />
    );
  } else if (page.template == "templates/clothing.php") {
    return (
      <ClothingPage pageData={page} />
    );
  } else if (page.template == "templates/outdoors.php") {
    return (
      <OutdoorsPage pageData={page} />
    );
  } else if (page.template == "templates/shop-category-page.php") {
    return (
      <ShopCategoryPage pageData={page} />
    );
  } else if (page.template == "templates/shop.php") {
    return (
      <ShopParent pageData={page} />
    );
  } else if (page.template == "templates/about.php") {
    return (
      <About pageData={page} />
    );
  } else if (page.template == "templates/contact.php") {
    return (
      <Contact pageData={page} />
    );
  } else if (page.template == "templates/corporate-boot-program.php") {
    return (
      <CorporateBoot pageData={page} />
    );
  } else if (page.template == "templates/apply.php") {
    return (
      <Apply pageData={page} />
    );
  } else if (page.template == "templates/policy.php") {
    return (
      <Policy pageData={page} />
    );
  } else if (page.template == "templates/footwear-parent.php") {
    return (
      <FootwearParent pageData={page} />
    );
  } else {
    return (null);
  }
}

export async function generateStaticParams() {
  const _pages = getAllPages();
  const pages = await _pages;
  return pages.map((pageSing) => ({ 
      slug: pageSing.slug 
  }));
}

export async function generateMetadata({ params: { slug } }) {
  const _page = getSinglePage(slug);
  const page = await _page;
  if (page.response !== '404') {
    return {
      title: page.acf.seo.meta_title,
      description: page.acf.seo.meta_description,
      alternates: {
        canonical: page.acf.seo.canonical
      },
      openGraph: {
        title: page.acf.seo.og_title,
        description: page.acf.seo.og_description,
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: page.acf.seo.social_image_url
          }
        ]
      },
      twitter: {
        title: page.acf.seo.twitter_title,
        description: page.acf.seo.twitter_description,
      }
    }
  }
}
