import { apiUrl, revalidateInterval } from '../../../../../global-settings.js';
import { notFound } from 'next/navigation';
import CollectionSingle from "../../../../../templates/CollectionSingle";

async function getAllCollections() {
  const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/collections.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN,
    },
    next: { revalidate: revalidateInterval }
  });
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSingleCollection(handle) {
    const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/admin/api/2020-01/products.json?product_type=${handle}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN,
    },
    next: { revalidate: revalidateInterval }
    });
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res.json();
      }
  }

async function getAllProductsInCat(handle) {
  const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/admin/api/2020-01/products.json?product_type=${handle}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN,
    },
    next: { revalidate: revalidateInterval }
  });
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getAllProducts() {
  const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/admin/api/2020-01/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN,
    },
    next: { revalidate: revalidateInterval }
  });
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page({params: { handle } }) {

  const _collection = getAllCollections();
  const collection = await _collection;

  const _productInCat = getAllProductsInCat(handle);
  const productInCat = await _productInCat;

  const _allProducts = getAllProducts(handle);
  const allProducts = await _allProducts;

  if (productInCat.products.length == 0) return notFound();

  return (
    <>
      <CollectionSingle productData={productInCat.products} allProducts={allProducts.products} collectionData={collection.collections} />
    </>
  );

  
}

export async function generateStaticParams() {
  const _collections = getAllCollections();
  const collections = await _collections;
  return collections.collections.map((collectionSing) => ({ 
    handle: collectionSing.handle
  }));
}
