import { apiUrl, revalidateInterval } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import ProductSingle from "../../../../templates/ProductSingle";

const SHOPIFY_STORE_URL = 'https://andersons-general-store-statesboro.myshopify.com';

const ALLOWED_COLLECTION_HANDLES = ['hats', 'misc', 'tops'];

async function shopifyFetch(url) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',

      // This is not usually needed for public Shopify .json storefront endpoints.
      // Keep it only if your setup requires it.
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN,
    },
    next: { revalidate: revalidateInterval },
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
}

async function getProductsByCollection(collectionHandle) {
  let page = 1;
  let products = [];

  while (true) {
    const data = await shopifyFetch(
        `${SHOPIFY_STORE_URL}/collections/${collectionHandle}/products.json?limit=250&page=${page}`
    );

    const pageProducts = data.products || [];
    products = [...products, ...pageProducts];

    if (pageProducts.length < 250) break;

    page += 1;
  }

  return products;
}

async function getAllProducts() {
  const collectionProductGroups = await Promise.all(
      ALLOWED_COLLECTION_HANDLES.map((handle) => getProductsByCollection(handle))
  );

  const products = collectionProductGroups.flat();

  // De-dupe products that may exist in multiple collections
  const uniqueProducts = Array.from(
      new Map(products.map((product) => [product.handle, product])).values()
  );

  return {
    products: uniqueProducts,
  };
}

async function getSingleProduct(handle) {
  const data = await shopifyFetch(
      `${SHOPIFY_STORE_URL}/products/${handle}.json`
  );

  return data;
}

async function isAllowedProduct(handle) {
  const products = await getAllProducts();
  return products.products.some((product) => product.handle === handle);
}

export default async function Page({ params: { handle } }) {
  const allowed = await isAllowedProduct(handle);

  if (!allowed) {
    notFound();
  }

  const product = await getSingleProduct(handle);

  return (
      <>
        <ProductSingle productData={product.product} />
      </>
  );
}

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.products.map((productSing) => ({
    handle: productSing.handle,
  }));
}

export async function generateMetadata({ params: { handle } }) {
  const allowed = await isAllowedProduct(handle);

  if (!allowed) {
    return {};
  }

  const productSing = await getSingleProduct(handle);

  return {
    title: productSing.product.title,
    description: productSing.product.body_html,
    openGraph: {
      title: productSing.product.title,
      description: productSing.product.body_html,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: productSing.product.title,
      description: productSing.product.body_html,
    },
  };
}