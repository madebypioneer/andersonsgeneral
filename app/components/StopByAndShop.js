'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

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
    padding: 0 8px 100px 8px;
    .wrapper {
        position: relative;
        max-width: 972px;
        margin: 0 auto;
        padding: 50px;
        img {
            border-radius: 15px;
        }
        .content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            z-index: 2;
            h4 {
                width: 100%;
                font-family: modesto-condensed,serif;
                font-size: 2rem;
                font-weight: 700;
                text-transform: uppercase;
                color: #19382F;
                text-align: center;
                padding-bottom: 10px;
                @media (min-width: 516px) {
                    width: 50%;
                    text-align: left;
                    padding-bottom: 0px;
                }
                @media (min-width: 992px) {
                    font-size: 3rem;
                }
            }
            a {
                margin: 0 auto;
            }
        }
    }
    
`;



export default function StopByAndShop({ stopByAndShop }) {

    let buttonLink = getButtonLink(stopByAndShop.acf.button.link_to_where, stopByAndShop.acf.button.onsite_link, stopByAndShop.acf.button.offsite_link, stopByAndShop.acf.button.file_link);
    
    return (
        <Content>
            <div className="wrapper">
                <Image src={`https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/inner-page-cta-bk-2.png`} alt={`background-image`} fill style={{ objectFit: 'cover' }} />
                <div className="content">
                    <h4>{stopByAndShop.acf.title}</h4>
                    <a href={buttonLink}>
                        <div className="dark-green-button">{stopByAndShop.acf.button.text}</div>
                    </a>
                </div>
            </div>
        </Content>
    );
}