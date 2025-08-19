'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import StopByAndShop from '../components/StopByAndShop.js';
import KeepBrowsing from '../components/KeepBrowsing.js';
import ProductBoxes from '../components/ProductBoxes.js';
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
            padding-bottom: 25px;
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

const AfterHero = styled.div`
    p {
        font-size: 20px;
        line-height: 1.6;
        padding: 50px 8px 50px 8px;
        color: #000000;
        max-width: 850px;
        margin: 0 auto;
        text-align: center;
        white-space: pre-wrap;
    }
`;

const FirstImageSection = styled.div`
    .wrapper {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        padding: 50px 8px 100px 8px;
        @media (min-width: 516px) {
            padding: 50px 8px 400px 8px;
        }
        @media (min-width: 992px) {
            max-width: 1400px;
        }
        @media (min-width: 1200px) {
            padding: 0px 8px 200px 8px;
        }
        .image-section {
            img {
                border-radius: 15px;
            }
            .first-row {
                
                grid-template-columns: repeat(12, 1fr);
                justify-content: center;
                gap: 30px;
                margin: 0 auto;
                padding-bottom: 30px;
                @media (min-width: 516px) {
                    display: grid;
                    padding-bottom: 0px;
                }
                .first-image {
                    position: relative;
                    grid-column: 1 / 8;
                    height: 250px;
                    margin-bottom: 30px;
                    @media (min-width: 516px) {
                        height: 300px;
                        margin-bottom: 0px;
                    }
                    @media (min-width: 768px) {
                        height: 480px;
                    }
                }
                .second-image {
                    position: relative;
                    grid-column: 8 / 13;
                    height: 250px;
                    margin-bottom: 30px;
                    @media (min-width: 516px) {
                        height: 400px;
                        margin-bottom: 0px;
                    }
                    @media (min-width: 768px) {
                        height: 580px;
                    }
                    @media (min-width: 992px) {
                        height: 780px;
                    }
                }
            }
            .second-row {
                grid-template-columns: repeat(12, 1fr);
                justify-content: center;
                margin-top: 0px;
                margin-left: 0px;
                @media (min-width: 516px) {
                    display: grid;
                }
               
                .first-image {
                    position: relative;
                    grid-column: 2 / 7;
                    height: 250px;
                    margin-top: -30px;
                    @media (min-width: 516px) {
                        margin-top: -50px;
                        height: 200px;
                    }
                    @media (min-width: 768px) {
                        grid-column: 3 / 7;
                    }
                    @media (min-width: 992px) {
                        height: 304px;
                        margin-top: -200px;
                    }
                }
            }
        }
    }
`;

const LargeImage = styled.div`
    position: relative;
    max-width: 2000px;
    margin: 100px auto 100px auto;
    height: 850px;
    img {
        @media (min-width: 2001px) {
            border-radius: 15px;
        }
    }
`;

const BrandsSection = styled.div`
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    padding: 0 8px 80px 8px;
    h2 {
        font-family: modesto-condensed,serif;
        font-size: 3rem;
        text-transform: uppercase;
        color: #19382F;
        padding-bottom: 15px;
        @media (min-width: 992px) {
            font-size: 4rem;
        }
    }
    p {
        font-size: 24px;
        line-height: 1.2;
        padding-bottom: 30px;
        color: #19382F;
        max-width: 700px;
        margin: 0 auto;
    }
    .brand-logos {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-align: center;
        gap: 20px;
        padding-bottom: 50px;
        .logo {
            margin: 0 auto;
        }
    }
`;

const SecondImageSection = styled.div`
    .wrapper {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        padding: 0px 8px 50px 8px;
        @media (min-width: 992px) {
            max-width: 1400px;
            padding: 50px 8px 100px 8px;
        }
        @media (min-width: 1200px) {
            padding: 0px 8px 200px 8px;
        }
        .image-section {
            img {
                border-radius: 15px;
            }
            .first-row {
                grid-template-columns: repeat(12, 1fr);
                justify-content: center;
                align-items: end;
                gap: 30px;
                margin: 0 auto;
                @media (min-width: 516px) {
                    display: grid;
                    padding-bottom: 0px;
                }
                .first-image {
                    position: relative;
                    grid-column: 1 / 8;
                    height: 250px;
                    margin-bottom: 30px;
                    @media (min-width: 516px) {
                       height: 480px;
                       margin-bottom: 0px;
                    }
                }
                .second-image {
                    position: relative;
                    grid-column: 8 / 13;
                    height: 320px;
                    width: 100%;
                    @media (min-width: 516px) {
                       
                    }
                    
                }
            }
            .second-row {
                grid-template-columns: repeat(12, 1fr);
                justify-content: center;
                align-items: start;
                gap: 30px;
                margin: 0 auto;
                padding: 30px 0 100px 0;
                @media (min-width: 516px) {
                    display: grid;
                    padding-bottom: 100px;
                }
                .first-image {
                    position: relative;
                    grid-column: 1 / 8;
                    height: 250px;
                    margin-bottom: 30px;
                    @media (min-width: 516px) {
                        height: 480px;
                        margin-bottom: 0px;
                    }
                    
                }
                .second-image {
                    position: relative;
                    grid-column: 8 / 13;
                    height: 320px;
                    
                }
            }
        }
    }
`;

// #endregion Styles

export default function ShopCategoryPage({ pageData }) {

    if (pageData.acf.hero_section.button.text) {
        var heroButtonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);
    }

    const stopByAndShop = pageData.global_sections[5];
    const keepBrowsing = pageData.global_sections[4];
    const productBoxes = pageData.global_sections[1];
    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
            <Hero>
                <img className="fill-img" src={`${pageData.acf.hero_section.background_image.sizes['1536x1536']}`}
                     alt={`${pageData.acf.hero_section.background_image.alt}`}/>
                <div className="gradient"></div>
                <div className="content">
                    <h1>{pageData.acf.hero_section.title}</h1>
                    {pageData.acf.hero_section.button.text ?
                        <a href={heroButtonLink}>
                            <div className="brown-button">{pageData.acf.hero_section.button.text}</div>
                        </a>
                        : ''}
                </div>
            </Hero>

            <AfterHero>
                <p>{pageData.acf.after_hero_paragraph}</p>
            </AfterHero>

            <FirstImageSection>
            <div className="wrapper">
                    <img className="contain-img" src={`https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/background-gallery-image.png`} alt={`background-image`}/>
                    <div className="image-section">
                        <div className="first-row">
                            <div className="first-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.first_image_section.image_1.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.first_image_section.image_1.alt}`}/>
                            </div>
                            <div className="second-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.first_image_section.image_2.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.first_image_section.image_2.alt}`}/>
                            </div>
                        </div>
                        <div className="second-row">
                            <div className="first-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.first_image_section.image_3.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.first_image_section.image_3.alt}`}/>
                            </div>
                        </div>
                    </div>
            </div>
            </FirstImageSection>

            <LargeImage>
            <img className="fill-img" src={`${pageData.acf.large_image.sizes['1536x1536']}`}
                     alt={`${pageData.acf.large_image.alt}`}/>
            </LargeImage>

            {pageData.acf.brands_section.brand_logo.length > 0 ?

                <BrandsSection>
                    <h2>{pageData.acf.brands_section.title}</h2>
                <p>{pageData.acf.brands_section.paragraph}</p>
                <div className="brand-logos">
                    {pageData.acf.brands_section.brand_logo.map((item, index) => {
                        return (
                            <div className="logo" key={index}>
                                <img width={128} height={128} src={`${item.logo.sizes['1536x1536']}`} alt={`${item.logo.alt}`}/>
                            </div>
                        )
                    })}
                </div>
            </BrandsSection>

            : 
            
            ''}

            {pageData.acf.second_image_section.image_1 ?

            <SecondImageSection>
                <div className="wrapper">
                    <img className="contain-img" src={`https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/background-gallery-image.png`} alt={`background-image`}/>
                    <div className="image-section">
                        <div className="first-row">
                            <div className="first-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.second_image_section.image_1.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.second_image_section.image_1.alt}`}/>
                            </div>
                            <div className="second-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.second_image_section.image_2.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.second_image_section.image_2.alt}`}/>
                            </div>
                        </div>
                        <div className="second-row">
                            <div className="first-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.second_image_section.image_3.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.second_image_section.image_3.alt}`}/>
                            </div>
                            <div className="second-image">
                                <img className="fill-img"
                                     src={`${pageData.acf.second_image_section.image_4.sizes['1536x1536']}`}
                                     alt={`${pageData.acf.second_image_section.image_4.alt}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </SecondImageSection>

            : 
                        
            ''}

            <StopByAndShop stopByAndShop={stopByAndShop} />

            <div className="spacer"></div>

            <KeepBrowsing keepBrowsing={keepBrowsing} />

            <ProductBoxes productBoxes={productBoxes} />

            <StayInTheKnow stayInTheKnow={stayInTheKnow} />
                
        </>
    );
}