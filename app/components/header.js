'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

function toggleDropdown(dropTrig) {
  dropTrig.target.nextSibling.classList.toggle("desktop-menu-toggle");
}

function toggleMobileDropdown(dropTrig) {
    dropTrig.target.nextSibling.classList.toggle("mobile-menu-toggle");
    dropTrig.target.querySelector('.mobile-menu-dropdown-icon').classList.toggle('mobile-menu-dropdown-icon-flipped');
}

function toggleDropdownOn(dropTrig) {
    dropTrig.target.nextSibling.classList.add("desktop-menu-toggle");
}
  
function toggleDropdownOff(dropTrig) {
    const desktopDropdowns = document.querySelectorAll('.dropdown');
    for (let i = 0; i < desktopDropdowns.length; i++) {
        desktopDropdowns[i].classList.remove("desktop-menu-toggle");
    }
}

const mobiletoggle = () => {
  document.getElementById("mobile-menu").classList.toggle("mobile-menu-active");
  document.getElementById("mobile-menu-close").classList.toggle("mobile-menu-toggle-icon");
}

function toggleCartHasItems() {
    const cartHasItems = document.querySelector('.cart-has-items');

    console.log(localStorage.getItem('cartItemList') !== null)

    if (localStorage.getItem('cartItemList') === null || JSON.parse(localStorage.getItem("cartItemList")).length === 0) {
        cartHasItems.classList.remove('cart-has-items-active');
    } else {
        cartHasItems.classList.add('cart-has-items-active');
    }
}

// #region Styles

const TopBarStyle = styled.div`
    background-color: #C6AA76;
    font-family: franklin-gothic-urw-cond,sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 1;
    .topbar-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1408px;
        padding: 13px 8px 15px 8px;
        margin: auto;
        color: #19382F;
        @media (min-width: 992px) {
            padding: 13px 8px 12px 8px;
        }
        .left-content {
            width: 100%;
            text-align: center;
            display: none;
            @media (min-width: 992px) {
                display: block;
                width: auto;
                text-align: left;
            }
        }
        .right-content {
            display: none;
            @media (min-width: 992px) {
                display: block;
            }
        }
    }
`;

const HeaderStyle = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #092615;
    z-index: 50;
    transition: .25s;
    .header-wrapper {
        max-width: 1408px;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: center;
        justify-content: center;
    }
    .desktop-menu-toggle {
        opacity: 1 !important;
        pointer-events: auto !important;
    }
    .mobile-menu-toggle {
        opacity: 1 !important;
        pointer-events: auto !important;
        height: 100% !important;
        padding-top: 8px !important;
    }
    .mobile-menu-active {
        pointer-events: initial !important;
        opacity: 1 !important;
        transform: scale(1.0) !important;
        transition: .25s;
    }
    .active-menu-toggle {
        opacity: 1 !important;
        width: 100% !important;
        height: 100% !important;
        padding: 10px !important;
    }
    .mobile-menu-active {
        pointer-events: initial !important;
        opacity: 1 !important;
        transform: scale(1.0) !important;
        transition: .25s;
    }
`;

const DesktopLogoLink = styled.div`
    grid-column: span 12 / span 12;
    margin: -15px auto -15px auto;
    padding-top: 5px;
    @media (min-width: 992px) {
        grid-column: span 2 / span 2;
        padding-top: 0px;
    }
    img {
        @media (min-width: 576px) {
            max-width: 226px;
        }
        @media (min-width: 992px) {
            max-width: 100%;
            margin: -30px auto -15px auto;
        }
        @media (min-width: 1200px) {
            max-width: 226px;
        }
    }
`;

const MobileMenuOpen = styled.div`
    position: fixed;
    bottom: 55px;
    left: auto;
    right: auto;
    width: 100%;
    z-index: 5;
    svg {
        margin: auto;
    }
    @media (min-width: 992px) {
        display: none;
    }
`

const MobileMenuClose = styled.div`
    display: none;
    position: fixed;
    bottom: 55px;
    left: auto;
    right: auto;
    width: 100%;
    z-index: 999;
    svg {
        margin: auto;
    }
`

const LeftNavi = styled.div`
    grid-column: span 5 / span 5;
    display: flex;
    align-items: center;
    ul {
        display: none;
        font-family: franklin-gothic-urw-cond,sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        align-items: center;
        @media (min-width: 992px) {
            display: flex;
        }
        @media (min-width: 1200px) {
            font-size: 16px;
        }
        li {
            color: #ffffff;
            a {
                color: #ffffff;
                padding: 8px 0px 8px 0px;
                @media (min-width: 992px) {
                    padding: 22px 0px 20px 0px;
                }
                @media (min-width: 1200px) {
                    padding: 26px 0px 24px 0px;
                }
            }
            @media (min-width: 992px) {
                margin-right: 30px;
            }
            @media (min-width: 1200px) {
                margin-right: 30px;
            }
            @media (min-width: 1440px) {
                margin-right: 48px;
            }
            &:hover {
                border-bottom: 4px solid #ffffff;
                margin-bottom: -4px;
            }
            .dropdown-trigger {
                padding: 8px 8px 8px 8px;
                @media (min-width: 992px) {
                    padding: 22px 8px 20px 8px;
                }
                @media (min-width: 1200px) {
                    padding: 26px 8px 24px 8px;
                }
            }
            .dropdown {
                opacity: 0;
                pointer-events: none;
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                background-color: #ffffff;
                padding: 5px;
                a {
                    width: 100%;
                    color: #092615;
                    padding: 5px 0 5px 0;
                }
            }
        }
    }
`

const RightNavi = styled.div`
    grid-column: span 5 / span 5;
    display: flex;
    align-items: center;
    ul {
        display: none;
        font-family: franklin-gothic-urw-cond,sans-serif;
        font-size: 14px;
        text-transform: uppercase;
        align-items: center;
        margin-left: auto;
        @media (min-width: 992px) {
            display: flex;
        }
        @media (min-width: 1200px) {
            font-size: 16px;
        }
        li {
            color: #ffffff;
            a {
                color: #ffffff;
                padding: 8px 0px 8px 0px;
                @media (min-width: 992px) {
                    padding: 22px 0px 20px 0px;
                }
                @media (min-width: 1200px) {
                    padding: 26px 0px 24px 0px;
                }
            }
            @media (min-width: 992px) {
                margin-left: 30px;
            }
            @media (min-width: 1200px) {
                margin-left: 30px;
            }
            @media (min-width: 1440px) {
                margin-left: 48px;
            }
            &:hover {
                border-bottom: 4px solid #ffffff;
                margin-bottom: -4px;
            }
            .dropdown-trigger {
                padding: 8px 8px 8px 8px;
                @media (min-width: 992px) {
                    padding: 22px 8px 20px 8px;
                }
                @media (min-width: 1200px) {
                    padding: 26px 8px 24px 8px;
                }
            }
            .dropdown {
                opacity: 0;
                pointer-events: none;
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                background-color: #ffffff;
                padding: 5px;
                a {
                    width: 100%;
                    color: #092615;
                    padding: 5px 0 5px 0;
                }
            }
        }
    }
    .cart {
        position: absolute;
        top: 60px;
        right: 10px;
        @media (min-width: 516px) {
            right: 50px;
        }
        @media (min-width: 992px) {
            position: relative;
            margin-left: 30px;
            padding-right: 8px;
            top: 0;
            right: 0;
        }
        .cart-has-items {
            opacity: 0;
            transform: scale(0);
            position: absolute;
            top: 0;
            right: 8px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #B79452;
            transition: .25s;
        }
        .cart-has-items-active {
            opacity: 1;
            transform: scale(1);
            transition: .25s;
        }
    }
`

const MobileMenu = styled.div`
    position: fixed;
    inset: 0;
    overflow-y: scroll;
    pointer-events: none;
    opacity: 0;
    transform: scale(1.1);
    background-color: #092615;
    padding: 48px 0px 0px 0px;
    z-index: 998;
    transition: .25s;
    .mobile-items {
        position: relative;
        padding-bottom: 200px;
        z-index: 998;
    }
    .mobile-menu-header {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: center;
        justify-content: center;
        padding: 6px 6px 6px 6px;
    }
    ul {
        padding-top: 3rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        li {
            font-family: modesto-condensed, serif;
            font-size: 48px;
            color: #fef4ea;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .mobile-single-drop {
            width: 100%;
            font-family: modesto-condensed, serif;
            font-size: 48px;
            color: #fef4ea;
            margin-bottom: 1rem;
            text-transform: uppercase;
            .dropdown-trigger {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            svg {
                pointer-events: none;
            }
            .dropdown {
                opacity: 0;
                height: 0;
                pointer-events: none;
                display: flex;
                flex-wrap: wrap;
                font-size: 40px;
                margin-left: 15px;
                a {
                    width: 100%;
                }
            }
            .drop-title {
                pointer-events: none;
            }
        }
    }
    .social {
        display: flex;
        padding: 1.5rem;
        a {
            margin-right: 1rem;
        }
    }
    .after-menu {
        padding: 1.5rem;
        h6 {
            font-family: franklin-gothic-urw,sans-serif;
            color: #fef4ea;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 1.5rem;
            b {
                width: 100%;
            }
        }
    }
`

// #endregion

export default function Header({ logos, physicalAddresses, socialMedia, storeHours, phoneNumbers, leftMenu, rightMenu, mobileMenu }) {

    const mainLogo = logos[0].acf.logo.url;
    const mainLogoAlt = logos[0].acf.logo.alt;

    const mobileLogo = logos[0].acf.mobile_menu_logo.url;
    const mobileLogoAlt = logos[0].acf.mobile_menu_logo.alt;

    const storeAddress = physicalAddresses[0].acf.value_list[0].street + ', ' + physicalAddresses[0].acf.value_list[0].city + ' ' + physicalAddresses[0].acf.value_list[0].state + ', ' + physicalAddresses[0].acf.value_list[0].zip;

    const weekHoursOpen = storeHours[0].acf.hour_list[0].open;
    const weekHoursClose = storeHours[0].acf.hour_list[0].close;

    const saturdayHoursOpen = storeHours[0].acf.hour_list[1].open;
    const saturdayHoursClose = storeHours[0].acf.hour_list[1].close;

    const instagram = socialMedia[0].acf.value_list[1].value;
    const facebook = socialMedia[0].acf.value_list[0].value;

    const phone = phoneNumbers[0].acf.value_list[0].value;

    useEffect(() => {
       
        toggleCartHasItems();

    }, []);

    return (
        <>
        <HeaderStyle>
            <TopBarStyle>
                <div className="topbar-wrapper">
                    <div className="left-content">
                        Store Hours: Monday thru Friday, {weekHoursOpen} - {weekHoursClose}, Saturday, {saturdayHoursOpen} - {saturdayHoursClose}
                    </div>
                    <div className="right-content">
                        Store Location: {storeAddress}
                    </div>
                </div>
            </TopBarStyle>
            <div className="header-wrapper">
                <LeftNavi>
                    <ul>
                        {leftMenu.map((item) => {
                            if (item.children) {
                                return (
                                    <li key={item.id} onMouseLeave={toggleDropdownOff}>
                                        <div id="dropdown-trigger" onMouseOver={toggleDropdownOn} className="dropdown-trigger">{item.title}</div>
                                        <div id="dropdown" className="dropdown" onMouseLeave={toggleDropdownOff}>
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
                </LeftNavi>
                <DesktopLogoLink href="/">
                    <a href="/">
                        <Image src={`${mainLogo}`} alt={`${mainLogoAlt}`} width={226} height={116} />
                    </a>
                </DesktopLogoLink>
                <RightNavi>
                    <ul>
                        {rightMenu.map((item) => {
                            if (item.children) {
                                return (
                                    <li key={item.id}>
                                        <div id="dropdown-trigger" onClick={toggleDropdown} className="">{item.title}</div>
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
                    <a href="/cart" className="cart">
                        <img src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/shopping-bag-03.svg" />
                        <div className="cart-has-items"></div>
                    </a>
                </RightNavi>
                <MobileMenu id="mobile-menu">
                    <div id="mobile-items" className="mobile-items">
                        <div className="mobile-menu-header">
                            <DesktopLogoLink>
                                <a href="/">
                                    <Image src={`${mobileLogo}`} alt={`${mobileLogoAlt}`} width={192} height={68} />
                                </a>
                            </DesktopLogoLink>
                        </div>
                        <ul>
                            {mobileMenu.map((item) => {
                                if (item.children) {
                                    return (
                                        <div key={item.id} className="mobile-single-drop">
                                            <div id="dropdown-trigger" className="dropdown-trigger" onClick={toggleMobileDropdown}>
                                                <div className="drop-title">{item.title}</div>
                                                <svg width="24" height="24" fill="#ffffff" className="mobile-menu-dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 365.3l22.6-22.6 160-160L429.3 160 384 114.7l-22.6 22.6L224 274.7 86.6 137.4 64 114.7 18.7 160l22.6 22.6 160 160L224 365.3z"/></svg>
                                            </div>
                                            <div className="dropdown">
                                                {Object.keys(item.children).map((key, index) => {
                                                    return (
                                                        <Link key={index} href={item.children[key].url} onClick={mobiletoggle}>{item.children[key].title}</Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <li key={item.id}>
                                            <Link href={item.url} onClick={mobiletoggle}>{item.title}</Link>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                        <div className="social">
                            <a href={instagram}>
                                <svg fill="#fef4ea" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                            </a>
                            <a href={facebook}>
                                <svg fill="#fef4ea" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                            </a>
                        </div>
                        <div className="after-menu">
                            <h6><b>Store Location:</b> {storeAddress}</h6>
                            <h6><b>Store Hours:</b> Monday thru Friday, {weekHoursOpen} - {weekHoursClose}, Saturday, {saturdayHoursOpen} - {saturdayHoursClose}</h6>
                            <a href={`${'tel:' + phone}`}>
                                <h6><b>Call:</b> {phone}</h6>
                            </a>
                        </div>
                    </div>
                </MobileMenu>
            </div>
            
        </HeaderStyle>
        <MobileMenuOpen id="mobile-menu-open" onClick={mobiletoggle}>
            <svg width="56" height="56" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_1820_7681)">
                <circle cx="41.5" cy="37.5" r="37.5" transform="rotate(-180 41.5 37.5)" fill="#092615"/>
                </g>
                <path d="M26.3076 25.834H56.6925" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round"/>
                <path d="M26.3076 37.5H56.6925" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round"/>
                <path d="M26.3076 49.166H56.6925" stroke="#FEFEFE" stroke-width="2" stroke-linecap="round"/>
                <defs>
                <filter id="filter0_d_1820_7681" x="0" y="0" width="83" height="83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1820_7681"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1820_7681" result="shape"/>
                </filter>
                </defs>
            </svg>
        </MobileMenuOpen>
        <MobileMenuClose id="mobile-menu-close" onClick={mobiletoggle}>
            <svg width="56" height="56" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_1650_6547)">
                <circle cx="41.5" cy="37.5" r="37.5" transform="rotate(-180 41.5 37.5)" fill="#B59760"/>
                </g>
                <rect x="31.7207" y="25.6523" width="32.0001" height="2.9253" transform="rotate(45 31.7207 25.6523)" fill="#092615"/>
                <rect x="29.6523" y="48.2793" width="32.0001" height="2.9253" transform="rotate(-45 29.6523 48.2793)" fill="#092615"/>
                <defs>
                <filter id="filter0_d_1650_6547" x="0" y="0" width="83" height="83" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1650_6547"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1650_6547" result="shape"/>
                </filter>
                </defs>
            </svg>
        </MobileMenuClose>
        </>
    );
}