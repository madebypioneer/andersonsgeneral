'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide, Slides } from '@splidejs/react-splide';
import SearchBox from '../components/SearchBox.js';

function toggleFilters() {
    let sidebar = document.querySelector('.sidebar');
    let breadcrumbs = document.querySelector('.breadcrumbs');
    let sidebarFilterButton = document.querySelector('.mobile-filter-toggle');
    if (sidebarFilterButton.innerText == "FILTER") {
        sidebar.style.display = 'block';
        sidebarFilterButton.innerText = 'CLOSE FILTERS';
        sidebarFilterButton.style.backgroundColor = '#285C4D';
        sidebarFilterButton.style.color = '#ffffff';
        breadcrumbs.scrollIntoView({ behavior: 'smooth' });
    } else {
        sidebar.style.display = 'none';
        sidebarFilterButton.innerText = 'FILTER';
        sidebarFilterButton.style.backgroundColor = 'transparent';
        sidebarFilterButton.style.color = '#285C4D';
        breadcrumbs.scrollIntoView({ behavior: 'smooth' });
    }
}


const Content = styled.div`
    padding: 100px 8px 200px 8px;
    .wrapper {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: start;
        max-width: 1440px;
        margin: 0 auto;
        .breadcrumbs {
            grid-column: 1 / 13;
            border-bottom: 3px solid #091511;
            margin-bottom: 80px;
            h6 {
                font-family: franklin-gothic-urw-cond,sans-serif;
                text-transform: uppercase;
                padding-bottom: 5px;
            }
        }
        .mobile-filter-toggle {
            grid-column: 1 / 13;
            width: 100%;
            max-width: 500px;
            font-family: franklin-gothic-urw-cond,sans-serif;
            text-transform: uppercase;
            text-align: center;
            font-size: 18px;
            color: #285C4D;
            border: 2px solid #285C4D;
            border-radius: 8px;
            margin: 0 auto 25px auto;
            @media (min-width: 768px) {
                display: none;
            }
        }
        .sidebar {
            display: none;
            grid-column: 1 / 13;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            padding-bottom: 80px;
            @media (min-width: 768px) {
                display: block !important;
                grid-column: 1 / 4;
                padding-bottom: 0px;
            }
            @media (min-width: 1200px) {
                grid-column: 1 / 3;
            }
            h4 {
                font-family: franklin-gothic-urw-cond,sans-serif;
                text-transform: uppercase;
                font-size: 24px;
                border-bottom: 2px solid #091511;
                padding-bottom: 0px;
            }
            .filter-type {
                display: flex;
                flex-wrap: wrap;
                opacity: 0;
                line-height: 0;
                padding: 0;
                transition: 0.25s;
                .filter-type-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    h5 {
                        pointer-events: none;
                    }
                    svg {
                        pointer-events: none;
                    }
                }
                .filter-input {
                    width: 100%;
                }
            }
            .filter-type {
                opacity: 1;
                line-height: 1;
                cursor: pointer;
                border-bottom: 2px solid #091511;
                transition: 0.25s;

                h5 {
                    font-family: franklin-gothic-urw-cond,sans-serif;
                    text-transform: uppercase;
                }

                .filter-type-title {
                    padding: 15px 5px 15px 5px;
                    &:hover {
                        background-color: rgba(40, 92, 77, 0.1);
                    }
                }

                .filter-input {
                    position: relative;
                    margin: 5px;
                    font-family: franklin-gothic-urw-cond,sans-serif;
                    text-transform: uppercase;
                    font-size: 14px;
                }

                label {
                    cursor: pointer;
                }

                input[type="checkbox"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #091511;
                    outline: none;
                    margin-right: 8px;
                    position: relative;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 3px;
                }

                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    background-color: transparent;
                    border: 2px solid #091511;
                    pointer-events: none;
                    border-radius: 3px;
                }

                input[type="checkbox"]:checked + .checkmark {
                    background-color: #285C4D;
                    border-color: #091511;
                }

                input[type="radio"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #091511;
                    outline: none;
                    margin-right: 8px;
                    position: relative;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 6em;
                }

                .radio {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    background-color: transparent;
                    border: 2px solid #091511;
                    pointer-events: none;
                    border-radius: 6em;
                }

                input[type="radio"]:checked + .radio {
                    background-color: #285C4D;
                    border-color: #091511;
                }
                
                .filter-input-group {
                    opacity: 0;
                    max-height: 0;
                    pointer-events: none;
                    transition: 0.25s;
                }
                .filter-input-group-open {
                    opacity: 1;
                    max-height: 2000px;
                    pointer-events: all;
                    padding-bottom: 15px;
                    transition: 0.25s;
                }
                .filter-type-icon {
                    transition: 0.25s;
                }
                .filter-type-icon-open {
                    transform: rotate(180deg);
                    transition: 0.25s;
                }
            }
        }
        .product-list {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 50px;
            grid-column: 1 / 13;
            padding: 0 8px 0 8px;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            @media (min-width: 768px) {
                grid-template-columns: repeat(2, 1fr);
                grid-column: 4 / 13;
                padding: 0 0px 0 50px;
                max-width: 2000px;
            }
            @media (min-width: 1200px) {
                grid-template-columns: repeat(3, 1fr);
                grid-column: 3 / 13;
            }
            .product-text-content {
                padding: 0 8px 0 8px;
                button {
                    border-width: 0px;
                }
            }
            h2 {
                font-family: 'franklin-gothic-urw', sans-serif;
                line-height: 1.2;
                font-size: 1.2rem;
                font-weight: 700;
                color: #222222;
                padding: 50px 0 30px 0;
            }
            h3 {
                font-family: 'franklin-gothic-urw', sans-serif;
                font-size: 20px;
                font-weight: 400;
                color: #222222;
                padding: 0px 0 15px 0;
            }
            .slide-single-img {
                position: relative;
                height: 350px;
                object-fit: contain;
                object-position: center;
                z-index: 1;
            }
            .product-text-content {
                text-align: center;
            }
            .product-filter-text {
                display: none;
            }
            .splide__pagination {
                bottom: -25px;
            }
            .splide__pagination__page {
                background-color: transparent;
                border: 1px solid #B79452;
                margin: 5px;
            }
            .is-active {
                background-color: #B79452;
            }
        }
        .other-collections {
            grid-column: 1 / 13;
            padding: 100px 8px 0 8px;
            text-align: center;
            @media (min-width: 768px) {
                text-align: left;
                grid-column: 4 / 13;
                padding: 100px 50px 0 50px;
            }
            @media (min-width: 1200px) {
                grid-column: 3 / 13;
            }
            h5 {
                font-family: 'modesto-condensed', serif;
                line-height: 1;
                font-size: 48px;
                text-transform: uppercase;
                color: #091511;
                padding-bottom: 10px;
            }
            ul {
                display: flex;
                flex-wrap: wrap;
            }
            a {
                font-family: franklin-gothic-urw-cond,sans-serif;
                text-transform: uppercase;
                font-size: 18px;
                padding: 15px;
                margin: 8px auto 8px auto;
                @media (min-width: 768px) {
                    margin: 8px 20px 8px 0;
                    padding: 0px;
                }
            }
        }
    }
    }
`;

export default function CollectionSingle({ productData, allProducts, collectionData }) {

    let productTags = [];

    function assembleTags(tag) {
        let tagListToAdd = tag.split(',');
        tagListToAdd.forEach((item, index) => {
            if (productTags.includes(item)) {
    
            } else {
                productTags.push(item);
            }
        });
    }

    // let optionOneList = [];

    // function assembleOptionOneList(product) {

    //         product.variants.forEach((item1, index) => {
    //             if (optionOneList.includes(item1.option1) || optionTwoList.includes(item1.option1)) {
    
    //             } else {
    //                 optionOneList.push(item1.option1);
    //             }
    //         });
    // }

    let sizeList = [];

    function assembleSizeList(product) {

            product.options.forEach((item, index) => {
                if (item.name == "Size") {
                    item.values.forEach((item1, index) => {
                        if (sizeList.includes(item1)) {
        
                        } else {
                            sizeList.push(item1);
                        }
                    });
                }
            });
    }

    let colorList = [];

    function assembleColorList(product) {

            product.options.forEach((item, index) => {
                if (item.name == "Color") {
                    item.values.forEach((item1, index) => {
                        if (colorList.includes(item1)) {
        
                        } else {
                            colorList.push(item1);
                        }
                    });
                }
            });
    }
           
    {productData.map((item, index) => {
        assembleTags(item.tags);
        assembleSizeList(item);
        assembleColorList(item);
    })}

    function optionFilter() {
        
        const radioButtons = document.getElementsByName('size-selection');
        let selectedValue = '';

        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedValue = radioButton.value;
                break;
            }
        }

        let colorCheckedBoxes = document.querySelectorAll('.color-checkbox:checked');
        let colorCheckedBoxesArray = [];
        let productList = document.querySelectorAll('.product');
        productList.forEach((item, index) => {
            let productSizeColorOptions = item.querySelectorAll('#value-size-color-pair');
            item.style.display = 'none';
            colorCheckedBoxes.forEach((item1, index) => {
                colorCheckedBoxesArray.push(item1.value);
                productSizeColorOptions.forEach((item2, index) => {
                    if (selectedValue) {
                        if (selectedValue == item2.innerText.split(' / ')[0] && item1.value == item2.innerText.split(' / ')[1] || item1.value == item2.innerText) {
                            item.style.display = 'block';
                            console.log('fires first')
                        }
                    } else if (item2.innerText.includes('/')) {
                        if (item1.value == item2.innerText.split(' / ')[1]) {
                            item.style.display = 'block';
                            console.log('fires middle')
                        }
                    } else {
                        if (item1.value == item2.innerText) {
                            item.style.display = 'block';
                            console.log('fires last')
                        }
                    }
                    
                });
            });
        });
        if (colorCheckedBoxesArray.length == 0) {
            productList.forEach((item, index) => {
                item.style.display = 'block';
            });
        }

    }

    function toggleFilterGroup(filterGroup) {
        filterGroup.target.parentElement.querySelector('.filter-input-group').classList.toggle('filter-input-group-open');
        filterGroup.target.querySelector('.filter-type-icon').classList.toggle('filter-type-icon-open');
    }

    return (
        <Content>
        <div className="wrapper">
            <div className="breadcrumbs">
                <h6>Anderson&apos;s Gear / <span>{productData[0].product_type}</span></h6>
            </div>

            <div className="sidebar">

                <div className="search-input-box">
                    <SearchBox data={allProducts} />
                </div>
                <h4>Filter</h4>

                {sizeList.length > 0 ?
   
                <div className="filter-type">
                    <div className="filter-type-title" onClick={toggleFilterGroup}>
                        <h5>Size</h5>
                        <svg className="filter-type-icon filter-type-icon-open" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 16.493C12.3166 16.8835 11.6834 16.8835 11.2929 16.493L5.29289 10.493C4.90237 10.1025 4.90237 9.46931 5.29289 9.07878C5.68342 8.68826 6.31658 8.68826 6.70711 9.07878L12 14.3717L17.2929 9.07878C17.6834 8.68826 18.3166 8.68826 18.7071 9.07878C19.0976 9.46931 19.0976 10.1025 18.7071 10.493L12.7071 16.493Z" fill="#091511"/>
                        </svg>
                    </div>
                    <div className="filter-input-group filter-input-group-open">
                        {sizeList.map((item, index) => {
                        return (
                            <div className="filter-input" key={index}>
                                <input id={item} type="radio" className="size-radio" name="size-selection" value={item} onChange={optionFilter} />
                                <span class="radio"></span>
                                <label for={item}>{item}</label>
                            </div>
                            )
                        })}
                    </div>
                </div>

                : 
                
                ''}

                {productTags.length > 0 ?
                
                <div className="filter-type">
                    <div className="filter-type-title" onClick={toggleFilterGroup}>
                        <h5>Tags</h5>
                        <svg className="filter-type-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 16.493C12.3166 16.8835 11.6834 16.8835 11.2929 16.493L5.29289 10.493C4.90237 10.1025 4.90237 9.46931 5.29289 9.07878C5.68342 8.68826 6.31658 8.68826 6.70711 9.07878L12 14.3717L17.2929 9.07878C17.6834 8.68826 18.3166 8.68826 18.7071 9.07878C19.0976 9.46931 19.0976 10.1025 18.7071 10.493L12.7071 16.493Z" fill="#091511"/>
                        </svg>
                    </div>
                    <div className="filter-input-group">
                        {productTags.map((item, index) => {
                            return (
                                <div className="filter-input" key={index}>
                                    <input id={item} type="checkbox" className="color-checkbox" value={item} onChange={optionFilter} />
                                    <span class="checkmark"></span>
                                    <label for={item}>{item}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                : 
                
                ''}

                {colorList.length > 0 ?
                
                <div className="filter-type">
                    <div className="filter-type-title" onClick={toggleFilterGroup}>
                        <h5>Color</h5>
                        <svg className="filter-type-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 16.493C12.3166 16.8835 11.6834 16.8835 11.2929 16.493L5.29289 10.493C4.90237 10.1025 4.90237 9.46931 5.29289 9.07878C5.68342 8.68826 6.31658 8.68826 6.70711 9.07878L12 14.3717L17.2929 9.07878C17.6834 8.68826 18.3166 8.68826 18.7071 9.07878C19.0976 9.46931 19.0976 10.1025 18.7071 10.493L12.7071 16.493Z" fill="#091511"/>
                        </svg>
                    </div>
                    <div className="filter-input-group">
                        {colorList.map((item, index) => {
                            return (
                                <div className="filter-input" key={index}>
                                    <input id={item} type="checkbox" className="color-checkbox" value={item} onChange={optionFilter} />
                                    <span class="checkmark"></span>
                                    <label for={item}>{item}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                : 
                
                ''}
                
            </div>

            <button className="mobile-filter-toggle" onClick={toggleFilters}>
                FILTER
            </button>

            <div className="product-list">
                {productData.map((item, index) => {
                    let productTags = [];
                    let productTagsToAdd = item.tags.split(',');
                    productTagsToAdd.forEach((item1, index) => {
                        productTags.push(item1)
                    })
                    return (
                        <div className="product" key={index}>
                            {item.images.length > 0 ?
                            <Splide hasTrack={ false }
                            options={ 
                                {
                                    type: 'slide',
                                    perPage: 1,
                                    pagination: true,
                                    arrows: false
                                } 
                            }
                                id="slider-image-box"
                                className=""
                            >
                                <SplideTrack>
                                    {item.images.map((item2, index) => {
                                        if (index < 8) {
                                            return (
                                                <SplideSlide key={index} className="slide-single-img splide__slide">
                                                    <div id={item2.id} className="slide-image-id"></div>
                                                    <a href={`${'/shop/' + item.handle}`}>
                                                    <Image src={item2.src} alt={item2.alt} fill style={{ objectFit: 'cover' }} />
                                                    </a>
                                                    
                                                </SplideSlide>
                                            );
                                        }
                                        
                                    })}
                                </SplideTrack>
                            </Splide>

                            : 
                            
                            <div className="slide-single-img"></div>
                            
                            }
                            <div className="product-text-content">
                                <h2>{item.title}</h2>
                                <h3>${item.variants[0].price}</h3>
                                <a href={`${'/shop/' + item.handle}`}>
                                        <button className="brown-button">See More</button>
                                </a>
                            </div>
                            <ul id="value-size-color-pair-list" className="product-filter-text">
                                {item.variants.map((item1, index) => {
                                    if (item1.inventory_quantity > 0) {
                                        return (
                                            <li id="value-size-color-pair" key={index}>
                                                {item1.title}
                                            </li>
                                            
                                        )
                                    }
                                })}
                                {productTags.map((item1, index) => {
                                    return (
                                        <li id="value-size-color-pair" key={index}>
                                            {item1}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <div className="other-collections">
                <h5>More from our Shop</h5>
                <ul>
                    {collectionData.map((item, index) => {
                            return (
                                <a href={`${'/shop/collections/' + item.title}`} key={index}>
                                    {item.title}
                                </a>
                            )
                    })}
                </ul>
            </div>
            
        </div>
        </Content>
    );
}