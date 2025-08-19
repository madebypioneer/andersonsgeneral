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
        padding: 150px 8px 100px 8px;
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
            padding-bottom: 150px;
        }
    }
`;

export default function ClothingPage({ pageData }) {

    const keepBrowsing = pageData.global_sections[4];
    const productBoxes = pageData.global_sections[1];
    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
            <Content>
                <div className="page-link-wrapper">
                    {pageData.acf.page_link.map((item, index) => {
                        let buttonLink = getButtonLink(item.button.link_to_where, item.button.onsite_link, item.button.offsite_link, item.file_link);
                        return (
                            <div className="page-link" key={index}>
                                <div className="image">
                                    <img className="fill-img"
                                         src={`${item.image.sizes['1536x1536']}`}
                                         alt={`${item.image.alt}`}/>
                                </div>
                                <h2>{item.title}</h2>
                                <a href={buttonLink}>
                                    <div className="green-button">{item.button.text}</div>
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