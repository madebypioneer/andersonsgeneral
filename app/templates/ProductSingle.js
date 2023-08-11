'use client';

import { motion } from "framer-motion";
import { useEffect } from 'react';
import Image from 'next/image';
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

function changeQuantity(numberElement) {
    const colorToSearch = numberElement.target.parentElement.parentElement.parentElement.parentElement.querySelector('.variant-show').querySelector('.color-to-search').innerText;
    const sizeToSearch = numberElement.target.parentElement.parentElement.parentElement.parentElement.querySelector('.variant-show').querySelector('.size-to-search').value;
    const variantTriggers = document.querySelectorAll('.variant-trigger');
    variantTriggers.forEach((item) => {
        const colorToCompare = item.querySelector('.variant-color-option').innerText;
        const sizeToCompare = item.querySelector('.variant-size-option').innerText;
        if (colorToCompare === colorToSearch && sizeToCompare === sizeToSearch) {
            console.log(item.id);
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
        
        const sizeToSearch = cartButton.target.parentElement.parentElement.parentElement.querySelector('.variant-show').querySelector('.size-to-search').value;
        const variantTriggers = document.querySelectorAll('.variant-trigger');
        variantTriggers.forEach((item) => {
            const colorToCompare = item.querySelector('.variant-color-option').innerText;
            const sizeToCompare = item.querySelector('.variant-size-option').innerText;
            
            if (colorToCompare === colorToSearch && sizeToCompare === sizeToSearch) {
                const variantId = item.id.toString();
                console.log(variantId);
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

function secondaryImgSwap(img) {
    const secondaryImgs = img.target.parentElement.parentElement.querySelectorAll('#variant-secondary-img');
    secondaryImgs.forEach((item) => {
        item.classList.remove('variant-secondary-img-active');
    });
    const primaryImgBox = img.target.parentElement.parentElement.querySelector('#variant-showcase-img');
    primaryImgBox.src = img.target.src;
    img.target.classList.add('variant-secondary-img-active');
    console.log(primaryImgBox);
    console.log(img.target.src);
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

const Content = styled.div`
    .wrapper {
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
                    grid-column: 1 / 7;
                }
                .product-content-box {
                    grid-column: 7 / 13;
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
                    }
                    .variant-id {
                        display: none;
                    }
                    .color-to-search {
                        font-family: 'franklin-gothic-urw', sans-serif;
                        line-height: 1.2;
                        font-size: 1.5rem;
                        color: #222222;
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
                    object-fit: contain;
                }
                .image-secondary-group {
                    
                }
                .variant-image-group {
                    position: relative;
                    width: 100%;
                    min-height: 700px;
                    height: 700px;
                    max-height: 700px;
                    padding: 0 50px 0 50px;
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
    .variant-showcase-img-active {
        border: 3px solid #092615;
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
        width: 100px;
        height: 100px;
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
        grid-column: 2 / 7;
        max-width: 450px;
        margin: 0 auto;
        padding-top: 25px;
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
        variantTriggers.forEach((item, index) => {
            item.addEventListener('click', (clickedItem) => {
                variantTriggers.forEach((item1) => {
                    if (item1.querySelector('.variant-showcase-img')) {
                        item1.querySelector('.variant-showcase-img').classList.remove('variant-showcase-img-active');
                    }
                });
                item.querySelector('.variant-showcase-img').classList.add('variant-showcase-img-active');
                variantSingles.forEach((item2, index2) => {
                    if (index2 === index) {
                        item2.classList.add('variant-show');
                    } else {
                        item2.classList.remove('variant-show');
                    }
                });
            });
        });

        

        const secondaryImgs = document.querySelectorAll('#variant-secondary-img');
        secondaryImgs[0].classList.add('variant-secondary-img-active');

    }, []);
    
    return (
        <Content>
            <div className="wrapper">
                <div className="product-data">
                    {productData.variants.map((item, index) => {
                        return (
                            <div className={index === 0 ? 'variant-single variant-show' : 'variant-single'} key={index}>
                                <div className="product-images">
                                    <ul className="image-secondary-group">
                                        {productData.images.map((item1, index) => {
                                            if (item.title === item1.alt || item.option2 === item1.alt) {
                                                return (
                                                    <>
                                                        <img id="variant-secondary-img" className="variant-secondary-img" src={item1.src} width={80} height={80} onClick={secondaryImgSwap} />
                                                    </>
                                                );
                                            }
                                        })}
                                    </ul>
                                    <div className="variant-image-group">
                                        {productData.images.length > 1 ? 

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

                                    </div>
                                </div>
                                <div className="product-content-box">
                                    <h1>{productData.title}</h1>
                                    <div id="variant-id" className="variant-id">{item.id}</div>
                                    {item.option2 ? <h3 className="color-to-search">{item.option2}</h3> : <h3 className="color-to-search">{item.title}</h3>}
                                    <h2 className="price">${item.price}</h2>
                                    {item.option2 ? 
                                    <>
                                    <h6>Select a Size</h6>
                                    <select className="size-to-search" onChange={resetQuantity}>
                                        {sizeOptions.map((item, index) => {
                                            return (
                                                <option value={item} key={index}>{item}</option>
                                            )
                                        })}
                                    </select>
                                    </>
                                    : 

                                    <select className="size-to-search hidden" onChange={resetQuantity}>
                                        
                                    </select>
                                    
                                    }
                                    <div className="quantity-box">
                                        <h6>Quantity</h6>
                                        <img id="quantity-minus" src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/minus.svg" onClick={quantityMinus} />
                                        <input type="number" id="quantity" min="1" value="1" disabled />
                                        <img id="quantity-plus" src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/plus.svg" onClick={quantityPlus} />
                                    </div>
                                    <button id="add-to-cart" onClick={addToCart} className="brown-button">Add to cart</button>
                                    <div id="add-to-cart-notice" className="cart-interaction">added to cart</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            
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
                                                <Image id="variant-showcase-img" className={index1 === 0 ? 'variant-showcase-img-active variant-showcase-img' : 'variant-showcase-img'} src={item1.src} fill style={{ objectFit: 'cover' }} key={index1} onClick={resetQuantity} />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        );
                    })}
                </div>
                
            </div>
        </Content>
    );
}

