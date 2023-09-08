import { apiUrl } from '../../../global-settings.js';
import { notFound } from 'next/navigation';
import ThankYou from "../../../templates/ThankYou.js";
import Cart from "../../../templates/Cart.js";
import ClothingPage from "../../../templates/ClothingPage.js";
import ShopCategoryPage from "../../../templates/ShopCategoryPage.js";
import About from "../../../templates/About.js";
import Contact from "../../../templates/Contact.js";

async function getAllPages() {
  const res = await fetch(apiUrl + `/pages/all`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSinglePage(slug) {
  const res = await fetch(apiUrl + `/pages/all/${slug}`)
  if (!res.ok) {
    return notFound();
  } 
  else if (slug == "home" || slug == "404-page" || res == "404") {
    return notFound();
  } else {
    return res.json();
  }
}

async function getAllProducts() {
  const res = await fetch(`https://andersons-general-store-statesboro.myshopify.com/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN,
    },
    next: { revalidate: 60 }
  });
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page({ params: { slug } }) {
  
  const _page = getSinglePage(slug);
  const page = await _page;

  const _products = getAllProducts();
  const products = await _products;

  if (page.response === '404') return notFound();

  if (page.template == "templates/thank-you.php") {
    return (
      <ThankYou pageData={page} />
    );
  } else if (page.template == "templates/cart.php") {
    return (
      <Cart pageData={page} products={products} />
    );
  } else if (page.template == "templates/clothing.php") {
    return (
      <ClothingPage pageData={page} />
    );
  } else if (page.template == "templates/shop-category-page.php") {
    return (
      <ShopCategoryPage pageData={page} />
    );
  } else if (page.template == "templates/about.php") {
    return (
      <About pageData={page} />
    );
  } else if (page.template == "templates/contact.php") {
    return (
      <Contact pageData={page} />
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