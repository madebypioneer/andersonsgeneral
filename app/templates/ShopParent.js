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


const Content = styled.div`
    .page-link-wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 30px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 150px 8px 150px 8px;
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
            padding-bottom: 100px;
        }
    }
`;

const GearSection = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 50px;
    align-items: center;
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 8px 200px 8px;
    text-align: center;
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 100px 8px 150px 8px;
        text-align: left;
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
            padding: 0 0 50px 0;
            z-index: 2;
        }
    }
    .image {
        position: relative;
        width: 100%;
        height: 480px;
        @media (min-width: 768px) {
            order: 2;
        }
    }
    .button {
        position: relative;
        z-index: 2;
    }
`;

export default function Page({ pageData }) {

    const keepBrowsing = pageData.global_sections[4];
    const productBoxes = pageData.global_sections[1];
    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
            <Content>
                <div className="page-link-wrapper">
                    {pageData.acf.shop_collections.map((item, index) => {
                        return (
                            <div className="page-link" key={index}>
                                <div className="image">
                                    <Image src={`${item.background_image.url}`} alt={`${item.background_image.alt}`} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <h2>{item.title}</h2>
                                <a href={item.link}>
                                    <div className="green-button">View Products</div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </Content>

            <KeepBrowsing keepBrowsing={keepBrowsing} />

            <ProductBoxes productBoxes={productBoxes} />

            <StayInTheKnow stayInTheKnow={stayInTheKnow} />

        </>
    );
}