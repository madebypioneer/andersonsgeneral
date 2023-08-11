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


const Events = styled.div`
    position: relative;
    padding: 100px 8px 0px 8px;
    text-align: center;
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
    .events-wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        padding: 0 8px;
        gap: 50px;
        max-width: 1200px;
        margin: 0 auto;
        @media (min-width: 516px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    .event-link {
        position: relative;
        padding: 120px 8px 120px 8px;
        img {
            border-radius: 15px;
        }
        .gradiant {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(25, 56, 47, 0.50);
            border-radius: 15px;
            transition: 0.25s;
            &:hover {
                background: rgba(25, 56, 47, 0.75);
                transition: 0.25s;
            }
        }
        h4 {
            position: relative;
            font-family: modesto-condensed,serif;
            font-size: 3rem;
            text-transform: uppercase;
            color: #ffffff;
            pointer-events: none;
            z-index: 2;

        }
    }
    @media (min-width: 992px) {
        
    }
`;

const OurHistory = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 50px;
    max-width: 900px;
    margin: 0 auto;
    padding: 150px 8px 150px 8px;
    overflow: hidden;
    text-align: center;
    @media (min-width: 768px) {
        text-align: left;
    }
    @media (min-width: 992px) {
        overflow: visible;
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 100px 8px 100px 8px;
    }
    .content {
        position: relative;
        order: 2;
        margin: 0px auto 0 auto;
        max-width: 500px;
        @media (min-width: 768px) {
            margin: 0px 0 0 0;
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
            font-size: 18px;
            line-height: 1.6;
            z-index: 2;
        }
    }
    .image {
        position: relative;
        width: 100%;
        height: 404px;
        @media (min-width: 768px) {
            order: 2;
        }
        img {
            position: absolute;
            bottom: 0px;
            right: -55px;
            @media (min-width: 992px) {
                bottom: -80px;
            }
        }
    }
`;

const OurTeam = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    padding: 50px 8px 100px 8px;
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
   .team-wrapper {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 25px;
        @media (min-width: 512px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
        .team-member {
            margin: 0 auto;
            img {
                border-radius: 15px;
            }
            h4 {
                font-family: modesto-condensed,serif;
                font-size: 2rem;
                text-transform: uppercase;
                line-height: 1;
                padding: 20px 0 15px 0;
                color: #19382F;
            }
            h5 {
                font-family: 'franklin-gothic-urw', sans-serif;
                font-size: 18px;
                font-weight: 700;
                color: #C6AA76;
                padding: 0 0 50px 0;
                line-height: 1;
            }
        }
        
   }
`;

export default function About({ pageData }) {

    const keepBrowsing = pageData.global_sections[4];
    const productBoxes = pageData.global_sections[1];
    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
            <Events>
                <h2>{pageData.acf.events_section.title}</h2>
                <div className="events-wrapper">
                    {pageData.acf.events_section.event.map((item, index) => {
                        return (
                            <a href={item.link} className="event-link" key={index}>
                                <Image src={`${item.background_image.url}`} alt={`${item.background_image.alt}`} fill style={{ objectFit: 'cover' }} />
                                <div className="gradiant"></div>
                                <h4>{item.title}</h4>
                            </a>
                        )
                    })}
                </div>
            </Events>

            <OurHistory>
                <div className="content">
                    <h2>{pageData.acf.our_history_section.title}</h2>
                    <p>{pageData.acf.our_history_section.paragraph}</p>
                </div>
                <div className="image">
                    <Image src={`${pageData.acf.our_history_section.badge.url}`} alt={`${pageData.acf.our_history_section.badge.alt}`} width={304} height={306} />
                    <Image src={`${pageData.acf.our_history_section.image.url}`} alt={`${pageData.acf.our_history_section.image.alt}`} fill style={{ objectFit: 'contain' }} />
                </div>
            </OurHistory>

            <OurTeam>
                <h2>{pageData.acf.team_section.title}</h2>
                <div className="team-wrapper">
                    {pageData.acf.team_section.team_member.map((item, index) => {
                        return (
                            <div className="team-member" key={index}>
                                <Image src={`${item.headshot.url}`} alt={`${item.headshot.alt}`} width={300} height={250} />
                                <h4>{item.name}</h4>
                                <h5>{item.job_title}</h5>
                            </div>
                        )
                    })}
                </div>
            </OurTeam>

            <KeepBrowsing keepBrowsing={keepBrowsing} />

            <ProductBoxes productBoxes={productBoxes} />

            <StayInTheKnow stayInTheKnow={stayInTheKnow} />
        </>
    );
}