'use client';

import { motion } from "framer-motion";
import { useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Splide, SplideTrack, SplideSlide, Slides } from '@splidejs/react-splide';

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

// function getVariantWithColor(changedElement) {
//     const colorToSearch = changedElement.target.parentElement.querySelector('.color-to-search').innerText;
//     const sizeToSearch = changedElement.target.value;
//     const variantTriggers = document.querySelectorAll('.variant-trigger');
//     variantTriggers.forEach((item) => {
//         const colorToCompare = item.querySelector('.variant-color-option').innerText;
//         const sizeToCompare = item.querySelector('.variant-size-option').innerText;
//         if (colorToCompare === colorToSearch && sizeToCompare === sizeToSearch) {
//             console.log(item.id);
//         }
//     });
// }

function resetQuantity(changedElement) {
    let quantity = changedElement.target.parentElement.parentElement.parentElement.parentElement.querySelector('#quantity');
    quantity.value = 1;
}

function resetSizes(changedElement) {
    let globalSizeOptions = document.querySelectorAll('.size-option');
    let globalSizeOptionLists = document.querySelectorAll('.size-list');
    globalSizeOptions.forEach((item) => {
        item.classList.remove('size-option-active');
    });
    globalSizeOptionLists.forEach((item, index) => {
        item.firstElementChild.classList.add('size-option-active');
    });
}

const resetQuantityAndSizes = (changedElement) => {
    resetQuantity(changedElement);
    resetSizes(changedElement);
};

function selectSize(thisSize) {
    let sizeOptions = document.querySelectorAll('.size-option');
    var thisOption = thisSize.target;
    sizeOptions.forEach((item) => {
        item.classList.remove('size-option-active');
    });
    thisOption.classList.add('size-option-active');
}

function changeQuantity(numberElement) {
    const colorToSearch = numberElement.target.parentElement.parentElement.parentElement.parentElement.querySelector('.variant-show').querySelector('.color-to-search').innerText;
    const sizeToSearch = numberElement.target.parentElement.parentElement.parentElement.parentElement.querySelector('.size-option-active').innerText;
    const variantTriggers = document.querySelectorAll('.variant-trigger');
    variantTriggers.forEach((item) => {
        const colorToCompare = item.querySelector('.variant-color-option').innerText;
        const sizeToCompare = item.querySelector('.variant-size-option').innerText;
        if (colorToCompare === colorToSearch && sizeToCompare === sizeToSearch) {
            
        }
    });
}

function quantityPlus(clickedItem) {
    let quantity = clickedItem.target.parentElement.querySelector('#quantity');
    let quantityValue = parseInt(quantity.value);
    quantityValue++;
    quantity.value = quantityValue;
    changeQuantity(clickedItem);
}

function quantityMinus(clickedItem) {
    let quantity = clickedItem.target.parentElement.querySelector('#quantity');
    let quantityValue = parseInt(quantity.value);
    if (quantityValue === 1) {

    } else {
        quantityValue--;
        quantity.value = quantityValue;
    }
}

let cartJson = [];
let cartItemsAccountedFor = false;

function getOtherCartItems() {
    // if (JSON.parse(window.localStorage.getItem("cartItemList"))) {
    //     const localStorageCart = JSON.parse(window.localStorage.getItem("cartItemList"));
    //     localStorageCart.forEach((item, index) => {
    //         cartJson.push(item);
    //     });
    //     console.log(cartJson);
    //     cartItemsAccountedFor = true;
    // }

}

function addToCart(cartButton) {

    const addToCartNotice = document.querySelectorAll('#add-to-cart-notice');

    if (JSON.parse(window.localStorage.getItem("cartItemList")) && cartJson.length !== JSON.parse(window.localStorage.getItem("cartItemList")).length) {
        let localStorageCart = JSON.parse(window.localStorage.getItem("cartItemList"));
        localStorageCart.forEach((item, index) => {
            cartJson.push(item);
            cartItemsAccountedFor = true;
        });
    }
    
    let quantity = cartButton.target.parentElement.parentElement.querySelector('#quantity').value;
    if (quantity >= 1) {
        const colorToSearch = cartButton.target.parentElement.parentElement.parentElement.querySelector('.variant-show').querySelector('.color-to-search').innerText;
        
        const sizeToSearch = cartButton.target.parentElement.parentElement.parentElement.querySelector('.size-option-active').innerText;
        const variantTriggers = document.querySelectorAll('.variant-trigger');
        variantTriggers.forEach((item) => {
            const colorToCompare = item.querySelector('.variant-color-option').innerText;
            const sizeToCompare = item.querySelector('.variant-size-option').innerText;
            
            if (colorToCompare === colorToSearch && sizeToCompare === sizeToSearch) {
                const variantId = item.id.toString();
                const variantIdToStore = item.id + ':' + quantity;
                cartJson = cartJson.filter(item => !item.startsWith(variantId));
                cartJson.push(variantIdToStore);
                window.localStorage.setItem("cartItemList", JSON.stringify(cartJson));

                addToCartNotice.forEach((item) => {
                    item.classList.add('cart-interaction-show');
                    setTimeout(function() {
                        item.classList.remove('cart-interaction-show');
                    }, 2000);
                });

                toggleCartHasItems();
                
                // console.log(searchForAlreadyAdded);
                // if () {
                //     console.log(`Found`);
                //     cartJson = searchForAlreadyAdded;
                // } else {
                //     console.log('Not found');
                //     cartJson.push(variantIdToStore);
                // }
            } else {
                console.log('Not found');
            }
        });
    }
}

function secondaryImgSwapDesktop(img) {
    const secondaryImgs = img.target.parentElement.parentElement.querySelectorAll('#variant-secondary-img');
    secondaryImgs.forEach((item) => {
        item.classList.remove('variant-secondary-img-active');
    });
    const primaryImgBox = img.target.parentElement.parentElement.querySelector('#variant-showcase-img');
    primaryImgBox.src = img.target.src;
    img.target.classList.add('variant-secondary-img-active');
}

function secondaryImgSwapMobile(img) {
const secondaryImgs = img.target.parentElement.parentElement.querySelectorAll('#variant-secondary-img');
secondaryImgs.forEach((item) => {
    item.classList.remove('variant-secondary-img-active');
});
const primaryImgBox = img.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('#variant-showcase-img');
primaryImgBox.src = img.target.src;
img.target.classList.add('variant-secondary-img-active');
}

 function toggleCartHasItems() {
    const cartHasItems = document.querySelector('.cart-has-items');

    if (localStorage.getItem('cartItemList') === null || JSON.parse(localStorage.getItem("cartItemList")).length === 0) {
        cartHasItems.classList.remove('cart-has-items-active');
    } else {
        cartHasItems.classList.add('cart-has-items-active');
    }
}

function nextShowcaseImg() {
    const currentShowcaseImg = document.querySelector('.variant-secondary-img-active');
    if (currentShowcaseImg.nextElementSibling) {
        currentShowcaseImg.nextElementSibling.classList.add('variant-secondary-img-active');
        currentShowcaseImg.nextElementSibling.click();
        currentShowcaseImg.classList.remove('variant-secondary-img-active');
    }
    else {
        currentShowcaseImg.parentElement.childNodes[0].classList.add('variant-secondary-img-active');
        currentShowcaseImg.parentElement.childNodes[0].click();
        currentShowcaseImg.classList.remove('variant-secondary-img-active');
    }
}

function prevShowcaseImg() {
    const currentShowcaseImg = document.querySelector('.variant-secondary-img-active');
    if (currentShowcaseImg.previousElementSibling) {
        currentShowcaseImg.previousElementSibling.classList.add('variant-secondary-img-active');
        currentShowcaseImg.previousElementSibling.click();
        currentShowcaseImg.classList.remove('variant-secondary-img-active');
    }
    else {
        let lastShowcaseImgIndex = currentShowcaseImg.parentElement.childNodes.length - 1;
        currentShowcaseImg.parentElement.childNodes[lastShowcaseImgIndex].classList.add('variant-secondary-img-active');
        currentShowcaseImg.parentElement.childNodes[lastShowcaseImgIndex].click();
        currentShowcaseImg.classList.remove('variant-secondary-img-active');
    }
}

const Content = styled.div`
    .wrapper {
        position: relative;
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: start;
        max-width: 1440px;
        padding: 100px 8px 100px 8px;
        margin: 0 auto;
        .product-data {
            grid-column: 1 / 13;
            .variant-single {
                display: none;
                grid-template-columns: repeat(12, 1fr);
                align-items: start;
                .product-images {
                    display: flex;
                    flex-wrap: wrap;
                    grid-column: 1 / 13;
                    max-height: 600px;
                    @media (min-width: 768px) {
                        grid-column: 1 / 7;
                        flex-wrap: nowrap;
                        min-height: unset;
                        max-height: 5000px;
                    }
                    .desktop-secondary-images {
                        display: none;
                        @media (min-width: 768px) {
                            display: block;
                        }
                    }
                    .mobile-secondary-images {
                        display: block;
                        width: 100%;
                        padding: 25px 0 0 0;
                        @media (min-width: 768px) {
                            display: none;
                        }
                        img {
                            height: 80px;
                            object-fit: cover;
                            margin: 0 auto;
                            @media (min-width: 516px) {
                                height: 100px;
                            }
                        }
                    }
                }
                .product-content-box {
                    grid-column: 1 / 13;
                    @media (min-width: 768px) {
                        grid-column: 7 / 13;
                    }
                    h1 {
                        font-size: 3rem;
                        color: #19382F;
                        text-transform: uppercase;
                        @media (min-width: 516px) {
                            font-size: 3.5rem;
                        }
                        @media (min-width: 768px) {
                            font-size: 4rem;
                        }
                    }
                    h6 {
                        font-family: 'franklin-gothic-urw', sans-serif;
                        font-size: 16px;
                        color: #091511;
                        padding-bottom: 8px;
                    }
                    .variant-id {
                        display: none;
                    }
                    .color-to-search {
                        font-family: 'franklin-gothic-urw', sans-serif;
                        line-height: 1.2;
                        font-size: 16px;
                        color: #091511;
                    }
                    .variant-title-no-option {
                        font-family: 'franklin-gothic-urw', sans-serif;
                        line-height: 1.2;
                        font-size: 1.5rem;
                        color: #222222;
                    }
                    .price {
                        font-family: 'franklin-gothic-urw', sans-serif;
                        line-height: 1.2;
                        font-size: 1.5rem;
                        color: #091511;
                        padding: 30px 0 30px 0;
                    }
                    select {
                        font-family: 'franklin-gothic-urw', sans-serif;
                        padding: 8px;
                        color: #091511;
                        border-radius: 6px;
                    }
                    .quantity-box {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        padding: 30px 0 50px 0;
                        h6 {
                            width: 100%;
                        }
                        input {
                            max-width: 66px;
                            text-align: center;
                            border: 1px solid #97783F;
                            font-family: 'franklin-gothic-urw', sans-serif;
                            color: #091511;
                            font-size: 24px;
                            border-radius: 6px;
                            margin: 5px;
                        }
                        img {
                            transition: .25s;
                            &:hover {
                                cursor: pointer;
                                transform: scale(1.1);
                                transition: .25s;
                            }
                        }
                    }
                }
                .variant-showcase-img-current {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .image-secondary-group {
                    
                }
                .variant-image-group {
                    position: relative;
                    width: 100%;
                    min-height: 300px;
                    height: 300px;
                    max-height: 300px;
                    padding: 0 15px 0 15px;
                    @media (min-width: 516px) {
                        min-height: 400px;
                        height: 400px;
                        max-height: 400px;
                    }
                    @media (min-width: 768px) {
                        padding: 0 25px 0 25px;
                    }
                    @media (min-width: 992px) {
                        padding: 0 50px 0 50px;
                    }
                    @media (min-width: 1200px) {
                        min-height: 700px;
                        height: 700px;
                        max-height: 700px;
                    }
                    .img-browse-arrows {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        padding: 0 60px 10px 60px;
                    }
                    .img-browse-arrow {
                        width: 32px;
                        height: 32px;
                        &:hover {
                            cursor: pointer;
                            fill: #204a3e;
                        }
                    }
                }
            }
        }
    }
    .variant-show {
        display: grid !important;
    }
    .variant-showcase-img {
        width: 20px;
        border: 3px solid transparent;
        transition: border .25s;
        &:hover {
            cursor: pointer;
            border: 3px solid #092615;
            transition: border .25s;
        }
    }
    .variant-secondary-img {
        border: 3px solid transparent;
        transition: border .25s;
        &:hover {
            cursor: pointer;
            border: 3px solid #092615;
            transition: border .25s;
        }
    }
    .variant-secondary-img-active {
        border: 3px solid #092615;
    }
    .showcase-img-wrapper {
        position: relative;
        width: 48px;
        height: 48px;
        border: 2px solid #091511;
        border-radius: 6px;
    }
    .variant-size-option {
        display: none;
    }
    .variant-color-option {
        display: none;
    }
    .variant-trigger-wrapper {
        display: flex;
        flex-wrap: wrap;
        grid-column: 1 / 13;
        gap: 8px;
        max-width: 450px;
        padding-bottom: 25px;
        @media (min-width: 768px) {
            grid-column: 2 / 7;
        }
    }
    .cart-interaction {
        font-family: 'franklin-gothic-urw', sans-serif;
        color: #091511;
        font-size: 16px;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: .25s;
    }
    .cart-interaction-show {
        opacity: 1;
        transform: translateY(0px);
        transition: .25s;
    }
    .desktop-product-title {
        font-size: 4rem;
        color: #19382F;
        text-transform: uppercase;
        display: none;
        @media (min-width: 768px) {
           display: block;
        }
    }
    .mobile-product-title {
        grid-column: 1 / 13;
        width: 100%;
        font-size: 2.5rem;
        color: #19382F;
        padding-bottom: 50px;
        text-transform: uppercase;
        text-align: center;
        @media (min-width: 516px) {
            font-size: 3rem;
        }
        @media (min-width: 768px) {
           display: none;
        }
    }
    .size-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        .size-option {
            font-family: 'franklin-gothic-urw', sans-serif;
            font-size: 16px;
            color: #97783F;
            border: 1px solid #97783F;
            border-radius: 4px;
            text-align: center;
            padding: 5px 10px 5px 10px;
            &:hover {
                cursor: pointer;
                color: #091511;
                border-color: #091511;
            }
        }
        .size-option-active {
            color: #091511;
            border-color: #091511;
            font-weight: 600;
        }
    }
    .add-to-cart-button {
        width: 100%;
        border-width: 0px;
    }
`;

export default function ProductSingle({ productData }) {

    let sizeOptions = [];

    productData.variants.map((item, index) => {

        if (item.option1 && sizeOptions.includes(item.option1) === false) {
            sizeOptions.push(item.option1);
        }

    });

    useEffect(() => {
       
        const variantTriggers = document.querySelectorAll('.variant-trigger');
        const variantSingles = document.querySelectorAll('.variant-single');
        const variantSecondaryImgsAll = document.querySelectorAll('.variant-secondary-img');
        variantTriggers.forEach((item, index) => {
            item.addEventListener('click', (clickedItem) => {
                variantTriggers.forEach((item1) => {
                    if (item1.querySelector('.variant-showcase-img')) {
                        item1.querySelector('.variant-showcase-img').classList.remove('variant-showcase-img-active');
                    }
                });
                item.querySelector('.variant-showcase-img').classList.add('variant-showcase-img-active');
                variantSingles.forEach((item2, index2) => {
                    if (item.id === item2.id) {
                        let variantSingleActiveImg = item2.querySelector('.image-secondary-group').childNodes[0];
                        item2.classList.add('variant-show');
                        variantSecondaryImgsAll.forEach((item3) => {
                            item3.classList.remove('variant-secondary-img-active');
                        });
                        variantSingleActiveImg.classList.add('variant-secondary-img-active');
                    } else {
                        item2.classList.remove('variant-show');
                    }
                });
            });
        });

        

        const secondaryImgs = document.querySelectorAll('#variant-secondary-img');

        if (secondaryImgs.length > 0) {
            secondaryImgs[0].classList.add('variant-secondary-img-active');
        }


    }, []);
    
    return (
        <Content>
            <div className="wrapper">
                <div className="product-data">
                    
                    {productData.variants.map((item, index) => {
                        return (
                            <div className={index === 0 ? 'variant-single variant-show' : 'variant-single'} id={item.id} key={index}>
                                <h1 className="mobile-product-title">{productData.title}</h1>
                                <div className="product-images">
                                    <ul className="image-secondary-group desktop-secondary-images">
                                        {productData.images.map((item1, index) => {
                                            if (item.title === item1.alt || item.option2 === item1.alt) {
                                                return (
                                                    <>
                                                        <img id="variant-secondary-img" className="variant-secondary-img" src={item1.src} width={80} height={80} onClick={secondaryImgSwapDesktop} />
                                                    </>
                                                );
                                            }
                                        })}
                                    </ul>
                                    <div className="variant-image-group">
                                        {productData.variants.length > 1 ? 

                                        productData.images.map((item1, index) => {
                                            if (item.id === item1.variant_ids[0]) {
                                                return (
                                                    <img id="variant-showcase-img" className="variant-showcase-img-current" src={item1.src} key={index} />
                                                );
                                            }
                                        })
                                        
                                        : 

                                        <img id="variant-showcase-img" className="variant-showcase-img-current" src={productData.image.src} key={index} />
                                        
                                        }
                                        <div className="img-browse-arrows">
                                            <svg id="img-browse-prev" className="img-browse-arrow" fill="#285c4d" onClick={prevShowcaseImg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"/></svg>
                                            <svg id="img-browse-next" className="img-browse-arrow" fill="#285c4d" onClick={nextShowcaseImg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/></svg>
                                        </div>
                                    </div>
                                    <Splide hasTrack={ false }
                                    options={ 
                                        {
                                            type: 'slide',
                                            perPage: 6,
                                            pagination: false,
                                            arrows: false
                                        } 
                                    }
                                        id=""
                                        className="image-secondary-group mobile-secondary-images"
                                    >
                                        <SplideTrack>
                                            {productData.images.map((item1, index) => {
                                                if (item.title === item1.alt || item.option2 === item1.alt) {
                                                    return (
                                                        <SplideSlide key={index} className="slide-single-img splide__slide">
                                                            <img id="variant-secondary-img" className="variant-secondary-img" src={item1.src} width={80} height={80} onClick={secondaryImgSwapMobile} />
                                                        </SplideSlide>
                                                    );
                                                }
                                            })}
                                        </SplideTrack>
                                    </Splide>
                                </div>
                                <div className="product-content-box">
                                    <h1 className="desktop-product-title">{productData.title}</h1>
                                    <div id="variant-id" className="variant-id">{item.id}</div>
                                    
                                    <h2 className="price">${item.price}</h2>
                                    {item.option2 ? <h6 className="color-to-search">{item.option2}</h6> : <h6 className="color-to-search">{item.title}</h6>}
                                    <div className="variant-trigger-wrapper">
                                        {productData.variants.map((item, index) => {
                                            return (
                                                <div className="variant-trigger" id={item.id} key={index}>
                                                    {item.option1 && !item.option2 ? <div className="variant-color-option">{item.option1}</div> : ''}
                                                    {item.option1 && item.option2 ? <div className="variant-size-option">{item.option1}</div> : <div className="variant-size-option"></div>}
                                                    {item.option2 ? <div className="variant-color-option">{item.option2}</div> : ''}
                                                    {productData.images.map((item1, index1) => {
                                                        if (item.id === item1.variant_ids[0]) {
                                                            return (
                                                                <div className="showcase-img-wrapper" key={index1}>
                                                                    <Image id="variant-showcase-img" className={index1 === 0 ? 'variant-showcase-img-active variant-showcase-img' : 'variant-showcase-img'} src={item1.src} fill style={{ objectFit: 'cover' }} key={index1} onClick={resetQuantityAndSizes} quality={25} />
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {item.option2 ? 
                                    <>
                                    <h6 className="">Select a Size</h6>
                                    <ul id="size-options" className="size-list">
                                        {sizeOptions.map((item, index) => {
                                            return (
                                            (index == 0) ? 
                                              
                                            <li key={index} className="size-option size-option-active" onClick={selectSize}>{item}</li>
                                                
                                            : 

                                            <li key={index} className="size-option" onClick={selectSize}>{item}</li>
                                            
                                            )
                                        })}
                                    </ul>
                                    {/* <select className="size-to-search" onChange={resetQuantity}>
                                        {sizeOptions.map((item, index) => {
                                            return (
                                                <option value={item} key={index}>{item}</option>
                                            )
                                        })}
                                    </select> */}
                                    </>
                                    : 

                                    <div className="size-option-active"></div>
                                    
                                    }
                                    <div className="quantity-box">
                                        <h6>Quantity</h6>
                                        <img id="quantity-minus" src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/minus.svg" onClick={quantityMinus} />
                                        <input type="number" id="quantity" min="1" value="1" disabled />
                                        <img id="quantity-plus" src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/plus.svg" onClick={quantityPlus} />
                                    </div>
                                    <button id="add-to-cart" onClick={addToCart} className="green-button add-to-cart-button">Add to cart</button>
                                    <div id="add-to-cart-notice" className="cart-interaction">added to cart</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            
                {/* <div className="variant-trigger-wrapper">
                    {productData.variants.map((item, index) => {
                        return (
                            <div className="variant-trigger" id={item.id} key={index}>
                                {item.option1 && !item.option2 ? <div className="variant-color-option">{item.option1}</div> : ''}
                                {item.option1 && item.option2 ? <div className="variant-size-option">{item.option1}</div> : <div className="variant-size-option"></div>}
                                {item.option2 ? <div className="variant-color-option">{item.option2}</div> : ''}
                                {productData.images.map((item1, index1) => {
                                    if (item.id === item1.variant_ids[0]) {
                                        return (
                                            <div className="showcase-img-wrapper" key={index1}>
                                                <Image id="variant-showcase-img" className={index1 === 0 ? 'variant-showcase-img-active variant-showcase-img' : 'variant-showcase-img'} src={item1.src} fill style={{ objectFit: 'cover' }} key={index1} onClick={resetQuantity} />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        );
                    })}
                </div> */}
                
            </div>
        </Content>
    );
}

