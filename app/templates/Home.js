'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import ProductBoxes from '../components/ProductBoxes.js';
import { ElfsightWidget } from 'react-elfsight-widget';
import StayInTheKnow from '../components/StayInTheKnow.js';

function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
    switch (linkToWhere) {
      case "Onsite":
        return (onSiteLink);
      case "Offsite":
        return (offSiteLink);
      case "File":
        return (fileLink);
      default:
        return ('/');
    }
}

// #region Styles

const Hero = styled.div`
    position: relative;
    .gradient {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: rgba(40,92,77,.7);
        z-index: 2;
    }
    .content {
        position: relative;
        max-width: 1400px;
        margin: 0 auto;
        text-align: center;
        padding: 150px 8px 150px 8px;
        z-index: 3;
        h1 {
            font-size: 3rem;
            color: #fff;
            @media (min-width: 516px) {
                font-size: 3.5rem;
            }
            @media (min-width: 768px) {
                font-size: 5rem;
            }
        }
        p {
            font-size: 1.2rem;
            font-weight: 700;
            color: #E4D7BE;
            padding-bottom: 25px;
            @media (min-width: 768px) {
                font-size: 1.5rem;
            }
        }
    }
`;

const VisitUs = styled.div`
    padding: 120px 8px 100px 8px;
    color: #19382F;
    text-align: center;
    h2 {
        font-size: 4rem;
        padding-bottom: 15px;
    }
    p {
        font-size: 1.5rem;
        padding-bottom: 50px;
    }
`;

const OurHistory = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 50px;
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 8px 50px 8px;
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 100px 8px 100px 8px;
    }
    .content {
        position: relative;
        order: 2;
        margin: 80px auto 0 auto;
        max-width: 500px;
        @media (min-width: 768px) {
            margin: 0px 0 0 0;
        }
        img {
            position: absolute;
            top: -100px;
            left: -120px;
        }
        h2 {
            position: relative;
            font-size: 3rem;
            padding-bottom: 15px;
            text-transform: uppercase;
            z-index: 2;
        }
        p {
            position: relative;
            font-size: 20px;
            line-height: 1.6;
            z-index: 2;
        }
    }
    .image {
        position: relative;
        width: 100%;
        height: 304px;
        @media (min-width: 768px) {
            order: 2;
        }
    }
`;

const NewArrivals = styled.div`
   max-width: 1000px;
   margin: 0 auto;
   text-align: center;
   padding: 50px 8px 0 8px;
   overflow: hidden;
   @media (min-width: 768px) {
    padding: 0px 8px 0 8px;
    }
   h3 {
        font-family: modesto-condensed,serif;
        font-size: 4rem;
        text-transform: uppercase;
        color: #19382F;
   }
   p {
        font-size: 24px;
        line-height: 1.6;
        padding-bottom: 30px;
        color: #19382F;
        max-width: 700px;
        margin: 0 auto;
    }
    h4 {
        font-family: 'franklin-gothic-urw', sans-serif;
        font-size: 24px;
        line-height: 1.6;
        padding: 30px 0 10px 0;
        margin: 0 auto;
    }
    .social {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 200px;
        gap: 20px;
    }
`;

// #endregion Styles

export default function Home({ pageData }) {

    let heroButtonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);

    const productBoxes = pageData.global_sections[1];
    const newArrivals = pageData.global_sections[0];

    const instagram = pageData.site_data[4].acf.value_list[1].value;
    const facebook = pageData.site_data[4].acf.value_list[0].value;

    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
            <Hero>
                <Image src={`${pageData.acf.hero_section.background_image.url}`} alt={`${pageData.acf.hero_section.background_image.alt}`} fill style={{ objectFit: 'cover' }} />
                <div className="gradient"></div>
                <div className="content">
                    <h1>{pageData.acf.hero_section.title}</h1>
                    <p>{pageData.acf.hero_section.paragraph}</p>
                    <a href={heroButtonLink}>
                        <div className="brown-button">{pageData.acf.hero_section.button.text}</div>
                    </a>
                </div>
            </Hero>
            <VisitUs>
                <h2>{pageData.acf.visit_us_section.title}</h2>
                <p>{pageData.acf.visit_us_section.paragraph}</p>
                <ProductBoxes productBoxes={productBoxes} />
            </VisitUs>

            <OurHistory>
                <div className="content">
                    <Image src={`${pageData.acf.our_history_section.badge.url}`} alt={`${pageData.acf.our_history_section.badge.alt}`} width={304} height={306} />
                    <h2>{pageData.acf.our_history_section.title}</h2>
                    <p>{pageData.acf.our_history_section.paragraph}</p>
                </div>
                <div className="image">
                    <Image src={`${pageData.acf.our_history_section.image.url}`} alt={`${pageData.acf.our_history_section.image.alt}`} fill style={{ objectFit: 'contain' }} />
                </div>
            </OurHistory>

            {/* <NewArrivals>
                <h3>{newArrivals.acf.title}</h3>
                <p>{newArrivals.acf.paragraph}</p>
                <ElfsightWidget widgetID="f87b6672-379e-4cc1-a068-12ec2e64a1a5" />
                <h4>{newArrivals.acf.what_we_are_up_to_title}</h4>
                <div className="social">
                    <a href={instagram}>
                        <svg fill="#285C4D" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                    </a>
                    <a href={facebook}>
                        <svg fill="#285C4D" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                    </a>
                </div>
            </NewArrivals> */}

            <StayInTheKnow stayInTheKnow={stayInTheKnow} />

        </>
    );
}