'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import styled from 'styled-components';
import ProductBoxes from '../components/ProductBoxes.js';
import KeepBrowsing from '../components/KeepBrowsing.js';
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

const BootBrands = styled.div`
    .page-link-wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 30px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 150px 8px 0px 8px;
        .page-link {
            text-align: center;
            padding-bottom: 50px;
            h2 {
                font-size: 2rem;
                text-transform: uppercase;
                padding: 50px 0 30px 0;
                @media (min-width: 768px) {
                    font-size: 3rem;
                }
            }
            .image {
                position: relative;
                width: 100%;
                height: 440px;
                img {
                    border-radius: 15px;
                }
            }
        }
        @media (min-width: 516px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 992px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
`;

const AfterHero = styled.div`
    p {
        font-size: 20px;
        line-height: 1.6;
        padding: 50px 8px 0px 8px;
        color: #000000;
        max-width: 850px;
        margin: 0 auto;
        text-align: center;
        white-space: pre-wrap;
    }
`;

const BootStyles = styled.div`
    .wrapper {
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
        padding: 100px 8px 150px 8px;
        text-align: center;
        h2 {
            font-size: 56px;
            text-align: center;
            color: #19382F;
        }
        ul {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            padding: 10px 0 0 0;
            @media (min-width: 768px) {
                grid-template-columns: repeat(3, 1fr);
            }
            li {
                font-family: 'franklin-gothic-urw', sans-serif;
                color #000000;
                font-size: 20px;
                padding: 5px 0 5px 0;
            }
        }
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

const FormBox = styled.div`
    padding: 0px 8px 0px 8px;
    .cog-form__container {
        .el-input__inner {
            width: 100%;
            font-family: 'franklin-gothic-urw', sans-serif;
            font-size: 16px;
            padding: 8px;
            border-radius: 15px;
            background-color: #f3ede2;
            border: 1.5px solid #c6aa76;
            margin-bottom: 20px;
            @media (min-width: 768px) {
                margin-bottom: 0px;
            }
        
        }
        .el-textarea__inner {
            width: 100%;
            height: 100px !important;
            font-family: 'franklin-gothic-urw', sans-serif;
            font-size: 16px;
            padding: 8px;
            border-radius: 15px;
            background-color: #f3ede2;
            border: 1.5px solid #c6aa76;
            margin-bottom: 20px;
            @media (min-width: 768px) {
                margin-bottom: 0px;
            }
        }
        .cog-button--navigation {
            margin-left: auto !important;
        }
        .cog-button {
            display: inline;
            background-color: #285C4D;
            font-family: 'franklin-gothic-urw', sans-serif;
            font-size: .875rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #ffffff;
            padding: 0.6rem 2rem 0.6rem 2rem;
            border-radius: 0.5rem;
            transition: 0.25s;
        }
        .cog-button:hover {
            background-color: #204a3e;
            transition: 0.25s;
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

// #endregion Styles

export default function Page({ pageData }) {

    useEffect(() => {
        Cognito.load("forms", { id: "75" });
    }, []);

    const keepBrowsing = pageData.global_sections[4];
    const productBoxes = pageData.global_sections[1];
    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>

            <Hero>
                <Image src={`${pageData.acf.hero_section.background_image.url}`} alt={`${pageData.acf.hero_section.background_image.alt}`} fill style={{ objectFit: 'cover' }} />
                <div className="gradient"></div>
                <div className="content">
                    <h1>{pageData.acf.hero_section.title}</h1>
                </div>
            </Hero>

            <BootBrands>
                <div className="page-link-wrapper">
                    {pageData.acf.boot_brands_one.boot_brand.map((item, index) => {
                        
                        return (
                            <div className="page-link" key={index}>
                                <div className="image">
                                    <Image src={`${item.image.url}`} alt={`${item.image.alt}`} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <h2>{item.title}</h2>
                            </div>
                        )
                    })}
                </div>
            </BootBrands>

            <AfterHero>
                <p>{pageData.acf.page_text}</p>
            </AfterHero>

            <BootBrands>
                <div className="page-link-wrapper">
                    {pageData.acf.boot_brands_two.boot_brand.map((item, index) => {
                        
                        return (
                            <div className="page-link" key={index}>
                                <div className="image">
                                    <Image src={`${item.image.url}`} alt={`${item.image.alt}`} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <h2>{item.title}</h2>
                            </div>
                        )
                    })}
                </div>
            </BootBrands>

            <BootStyles>
                <div className="wrapper">
                    <h2>{pageData.acf.boot_styles.title}</h2>
                    <ul>
                        {pageData.acf.boot_styles.styles.map((item, index) => {
                            return (
                                <li className="" key={index}>
                                    {item.style}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </BootStyles>

            <FirstImageSection>
                <div className="wrapper">
                    <Image src={`https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/background-gallery-image.png`} alt={`background-image`} fill style={{ objectFit: 'contain' }} />
                    <div className="image-section">
                        <div className="first-row">
                            <div className="first-image">
                                <Image src={`${pageData.acf.first_image_section.image_1.url}`} alt={`${pageData.acf.first_image_section.image_1.alt}`} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="second-image">
                                <Image src={`${pageData.acf.first_image_section.image_2.url}`} alt={`${pageData.acf.first_image_section.image_2.alt}`} fill style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                        <div className="second-row">
                            <div className="first-image">
                                <Image src={`${pageData.acf.first_image_section.image_3.url}`} alt={`${pageData.acf.first_image_section.image_3.alt}`} fill style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </FirstImageSection>

            <FormBox>
                <div className="cognito">
                    <div className="loader">Form loading...</div>
                </div>
            </FormBox>

            <LargeImage>
                <Image src={`${pageData.acf.large_image.url}`} alt={`${pageData.acf.large_image.alt}`} fill style={{ objectFit: 'cover' }} />
            </LargeImage>

            <KeepBrowsing keepBrowsing={keepBrowsing} />

            <ProductBoxes productBoxes={productBoxes} />

            <StayInTheKnow stayInTheKnow={stayInTheKnow} />

        </>
    );
}