'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

function getYear() {
    return new Date().getFullYear();
}

// #region Styles

const FooterStyle = styled.footer`
    background-color: #19382F;
    font-family: franklin-gothic-urw,sans-serif;
    font-weight: 400;
    color: #fef4ea;
    padding: 100px 8px 150px 8px;
    text-align: center;
    @media (min-width: 516px) {
        text-align: left;
    }
    .wrapper {
        grid-gap: 50px;
        max-width: 1280px;
        margin: 0 auto;
        @media (min-width: 516px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 768px) {
            grid-template-columns: repeat(4, 1fr);
        }
        @media (min-width: 992px) {
            grid-template-columns: repeat(5, 1fr);
        }
        img {
            margin: 0 auto;
            padding-bottom: 15px;
            @media (min-width: 516px) {
                margin-left: 0;
                padding-bottom: 0px;
            }
        }
        .footer-content {
            grid-column: 2 / 5;
            padding-bottom: 50px;
            @media (min-width: 516px) {
                padding-bottom: 0px;
            }
            @media (min-width: 768px) {
                grid-column: 2 / 4;
            }
            @media (min-width: 992px) {
                grid-column: 2 / 3;
            }
        }
        .second-menu {
            padding-bottom: 50px;
            @media (min-width: 516px) {
                padding-bottom: 0px;
            }
        }
        .footer-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            width: 100%;
            padding-bottom: 15px;
            @media (min-width: 516px) {
                padding-bottom: 0px;
            }
        }
        .menu-children {
            display: flex;
            flex-wrap: wrap;
        }
        a {
            display: block;
            width: 100%;
            padding-bottom: 15px;
            transition: 0.25s;
            &:hover {
                color: #B59760;
                transition: 0.25s;
            }
            @media (min-width: 516px) {
                padding-bottom: 0px;
            }
        }
        .footer-subtitle {
            font-size: 14px;
        }
    }
    .copyright-wrapper {
        grid-gap: 50px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 100px 8px 0 8px;
        text-align: center;
        @media (min-width: 516px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            text-align: left;
        }
        .text {
            font-size: 12px;
        }
        .pioneer {
            img {
                text-align: center;
                margin: 0 auto;
                padding: 50px 0 50px 0;
                @media (min-width: 516px) {
                    padding: 0px 0 0px 0;
                }
            }
        }
        .social {
            display: flex;
            margin: 0 auto;
            @media (min-width: 516px) {
                margin-right: 0;
            }
            a {
                margin: 0 auto;
                @media (min-width: 516px) {
                    margin-left: 20px;
                }
            }
        }
    }
`;

// #endregion Styles

export default function Footer({ logos, socialMedia, physicalAddresses, phoneNumbers, storeHours, footerMenuOne, footerMenuTwo, footerParagraph, siteName }) {

    const footerLogo = logos[0].acf.footer_logo.url;
    const footerLogoAlt = logos[0].acf.footer_logo.alt;

    const footerContent = footerParagraph[0];

    const storeAddress = physicalAddresses[0].acf.value_list[0].street + ', ' + physicalAddresses[0].acf.value_list[0].city + ' ' + physicalAddresses[0].acf.value_list[0].state + ', ' + physicalAddresses[0].acf.value_list[0].zip;

    const weekHoursOpen = storeHours[0].acf.hour_list[0].open;
    const weekHoursClose = storeHours[0].acf.hour_list[0].close;

    const saturdayHoursOpen = storeHours[0].acf.hour_list[1].open;
    const saturdayHoursClose = storeHours[0].acf.hour_list[1].close;

    const instagram = socialMedia[0].acf.value_list[1].value;
    const facebook = socialMedia[0].acf.value_list[0].value;

    const phone = phoneNumbers[0].acf.value_list[0].value;

    return (
        <FooterStyle>
            <div className="wrapper">
                <Image src={`${footerLogo}`} alt={`${footerLogoAlt}`} width={192} height={192} />
                <div className="footer-content">
                    <h6 className="footer-title">{footerContent.acf.title}</h6>
                    <p>{footerContent.acf.paragraph}</p>
                </div>
                <ul className="first-menu">
                    {footerMenuOne.map((item) => {
                        if (item.children) {
                            return (
                                <li key={item.id}>
                                    <div id="dropdown-trigger" className="footer-title dropdown-trigger">{item.title}</div>
                                    <div id="dropdown" className="dropdown">
                                    {Object.keys(item.children).map((key, index) => {
                                        return (
                                            <Link key={index} href={item.children[key].url}>{item.children[key].title}</Link>
                                        );
                                    })}
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={item.id}>
                                    <Link href={item.url}>{item.title}</Link>
                                </li>
                            )
                        }
                    })}
                </ul>
                <ul className="second-menu">
                    {footerMenuTwo.map((item) => {
                        if (item.children) {
                            return (
                                <li key={item.id}>
                                    <div id="dropdown-trigger" className="footer-title dropdown-trigger">{item.title}</div>
                                    <div id="dropdown" className="menu-children">
                                    {Object.keys(item.children).map((key, index) => {
                                        return (
                                            <Link key={index} href={item.children[key].url}>{item.children[key].title}</Link>
                                        );
                                    })}
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={item.id}>
                                    <Link href={item.url}>{item.title}</Link>
                                </li>
                            )
                        }
                    })}
                </ul>
                <div className="">
                    <h6 className="footer-title">Customer Service</h6>
                    <h6><b className="footer-subtitle">Store Location</b><br/>{storeAddress}</h6>
                    <br/>
                    <h6><b className="footer-subtitle">Store Hours</b><br/> Mon - Fri, {weekHoursOpen} - {weekHoursClose}<br/> Saturday, {saturdayHoursOpen} - {saturdayHoursClose}</h6>
                    <br/>
                    <a href={`${'tel:' + phone}`}>
                        <h6>{phone}</h6>
                    </a>
                </div>
            </div>
            <div className="copyright-wrapper">
                <div className="text">
                    &copy; {getYear()} {siteName.replace("&#039;", "'")}, All Rights Reserved
                </div>
                <a href="https://madebypioneer.com/" className="pioneer">
                    <img src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/Group-8272.svg" />
                </a>
                <div className="social">
                    <a href={instagram}>
                        <svg fill="#fef4ea" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                    </a>
                    <a href={facebook}>
                        <svg fill="#fef4ea" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                    </a>
                </div>
            </div>
        </FooterStyle>
    );
}