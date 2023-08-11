import { apiUrl } from '../../global-settings.js';
import Home from '../../templates/Home';

async function getPage() {
  const res = await fetch(apiUrl + `/pages/all/home`)
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

export default async function Page() {
  const _page = getPage();
  const page = await _page;
  
  return (
    <>
      <Home pageData={page} />
    </>
  );
}

export async function generateMetadata() {
  const _page = getPage();
  const page = await _page;

  return {
    title: page.acf.seo.meta_title,
    description: page.acf.seo.meta_description,
    alternates: {
      canonical: page.acf.seo.canonical
    },
    openGraph: {
      title: page.acf.seo.og_title,
      description: page.acf.seo.og_description,
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