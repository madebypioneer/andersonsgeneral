import { apiUrl, revalidateInterval } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import ProductSingle from "../../../../templates/ProductSingle";

async function getAllProducts() {
  const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/products.json?limit=250`, {
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

async function getSingleProduct(handle) {
    const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/products/${handle}.json/`, {
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

  const _product = getSingleProduct(handle);
  const product = await _product;

  return (
    <>
      <ProductSingle productData={product.product} />
    </>
  );

  
}

export async function generateStaticParams() {
  const _products = getAllProducts();
  const products = await _products;
  return products.products.map((productSing) => ({ 
    handle: productSing.handle
  }));
}
