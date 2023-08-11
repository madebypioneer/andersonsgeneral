'use client';

import { motion } from "framer-motion";
import { useEffect } from 'react';
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

const cartForCheckoutPrepared = [];

const handleCheckout = async () => {

    let localStorageCart = JSON.parse(window.localStorage.getItem("cartItemList"));

    let cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach((item, index) => {
        const variantId = item.querySelector('#cart-item-id').innerText.toString();
        let quantity = item.querySelector('#quantity').value;
        const variantIdToStore = variantId + ':' + quantity;
        localStorageCart = localStorageCart.filter(item => !item.startsWith(variantId));
        localStorageCart.push(variantIdToStore);
        console.log(localStorageCart);
    });

    for (let i = 0; i < localStorageCart.length; i++) {
      
        // Add the joined elements to the new array
        cartForCheckoutPrepared.push(localStorageCart[i]);
    }
    // localStorage.removeItem("cartItemList");
    window.location.href = `https://andersons-general-store-statesboro.myshopify.com/cart/` + cartForCheckoutPrepared;
};

const removeCartItem = async (cartItemElement, removalId) => {
    console.log(removalId);
    const variantId = removalId.toString();
    let localStorageCart = JSON.parse(window.localStorage.getItem("cartItemList"));
    localStorageCart = localStorageCart.filter(item => !item.startsWith(variantId));
    window.localStorage.setItem("cartItemList", JSON.stringify(localStorageCart));
    console.log(cartItemElement);
    cartItemElement.remove();
    calculateCartTotals();
    toggleCartHasItems();
};

const reCalculateItemTotals = async () => {

    const cartItemQuantities = document.querySelectorAll('#quantity');
    cartItemQuantities.forEach((item, index) => {
        let itemPriceToUpdate = item.parentElement.parentElement.querySelector('.cart-item-price').innerText;
        let itemTotalToUpdate = item.parentElement.parentElement.querySelector('.cart-item-total');
        itemPriceToUpdate.replace('$', '');
        let newTotalPrice = formatCurrency(itemPriceToUpdate.replace('$', '') * item.value);
        itemTotalToUpdate.innerText = '$' + newTotalPrice;
    });

};

const calculateCartTotals = async () => {

    const cartSubtotalElement = document.querySelector('.cart-subtotal');
    const cartItemTotalTexts = document.querySelectorAll('.cart-item-total');
    const cartItemTotalArray = [...cartItemTotalTexts];

    console.log(cartItemTotalTexts);

    let cartItemSubtotal = cartItemTotalArray.reduce((subtotal, item) => {
        let cartItemTotal = parseFloat(item.innerText.replace('$', ''));
        subtotal += cartItemTotal;
        return subtotal;
      }, 0);
      
      cartSubtotalElement.innerText = 'Estimated Subtotal: $' + formatCurrency(cartItemSubtotal);

};

function formatCurrency(amount) {
  // Ensure the input is treated as a number
  const numericAmount = parseFloat(amount);
  // Round to two decimal places using toFixed() method
  const roundedAmount = numericAmount.toFixed(2);
  // Return the formatted amount as a string
  return roundedAmount;
}

function toggleCartHasItems() {
    const cartHasItems = document.querySelector('.cart-has-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const explainBar = document.querySelector('.explain-bar');
    const checkoutWrapper = document.querySelector('.checkout-wrapper');

    console.log(localStorage.getItem('cartItemList') !== null)

    if (localStorage.getItem('cartItemList') === null || JSON.parse(localStorage.getItem("cartItemList")).length === 0) {
        cartHasItems.classList.remove('cart-has-items-active');
        cartEmpty.classList.remove('hidden');
        explainBar.classList.add('hidden');
        checkoutWrapper.classList.add('hidden');
    } else {
        cartHasItems.classList.add('cart-has-items-active');
        cartEmpty.classList.add('hidden');
        explainBar.classList.remove('hidden');
        checkoutWrapper.classList.remove('hidden');
    }
}

const Content = styled.div`
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 100px 8px 0 8px;
        h1 {
            font-family: franklin-gothic-urw-cond,sans-serif;
            text-transform: uppercase;
            font-size: 1.5rem;
            color: #091511;
        }
        .cart-items-total {
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 1rem;
            color: #091511;
            margin-left: 8px;
        }
        .explain-bar {
            display: none;
            grid-template-columns: repeat(12, 1fr);
            width: 100%;
            background-color: #E4D7BE;
            padding: 10px 15px 10px 15px;
            margin: 20px 0 20px 0;
            @media (min-width: 992px) {
                display: grid;
            }
            h6 {
                font-family: franklin-gothic-urw-cond,sans-serif;
                text-transform: uppercase;
                font-size: 1rem;
                color: #4F3F21;
            }
            .items {
                grid-column: 1 / 5;
            }
            .quantity {
                grid-column: 6 / 8;
            }
            .item-price {
                grid-column: 9 / 10;
            }
            .total {
                grid-column: 11 / 13;
                margin-left: auto;
            }
        }
    }
    .cart-empty {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding-bottom: 500px;
        h2 {
            width: 100%;
            font-size: 4rem;
            color: rgba(12, 11, 8, 0.75);
            padding: 20px 0 20px 0;
        }
        .content {
            max-width: 600px;
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 1.4rem;
            color: rgba(12, 11, 8, 0.75);
            white-space: pre-line;
            p {
                line-height: 1.4;
            }
            a {
                color: #37806B;
                text-decoration: underline;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`;

const CartStyle = styled.div`

    @media (min-width: 516px) {
        display: flex;
        flex-wrap: wrap;
    }
    @media (min-width: 992px) {
        display: block;
    }
    .cart-item {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: start;
        width: 100%;
        max-width: 1200px;
        padding: 30px 15px 30px 15px;
        @media (min-width: 516px) {
            width: 50%;
        }
        @media (min-width: 992px) {
            width: 100%;
            padding: 10px 15px 10px 15px;
            margin: 0 auto;
        }
        #cart-item-id {
            display: none;
        }
        .variant-img {
            grid-column: 1 / 13;
            width: 120px;
            height: 120px;
            object-fit: cover;
            @media (min-width: 992px) {
                grid-column: 1 / 1;
            }
        }
        .cart-item-content {
            grid-column: 1 / 13;
            padding: 20px 0 20px 0;
            @media (min-width: 992px) {
                grid-column: 2 / 6;
                padding: 0 20px 0 20px;
            }
            a {
                font-family: franklin-gothic-urw,sans-serif;
                font-size: 20px;
                color: #091511;
                text-decoration: underline;
            }
            h4 {
                font-family: franklin-gothic-urw,sans-serif;
                font-size: 14px;
                color: #091511;
                padding: 10px 0 20px 0;
            }
            button {
                font-family: franklin-gothic-urw,sans-serif;
                font-size: 14px;
                color: #37806B;
                text-decoration: underline;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .quantity-box {
            grid-column: 1 / 13;
            display: flex;
            align-items: center;
            padding: 0px 0 0px 0;
            @media (min-width: 992px) {
                grid-column: 6 / 9;
            }
            h6 {
                width: 100%;
            }
            input {
                max-width: 66px;
                text-align: center;
                border: 1px solid #97783F;
                font-family: 'franklin-gothic-urw', sans-serif;
                color: #091511;
                font-size: 18px;
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
        .cart-item-price {
            grid-column: 1 / 13;
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 16px;
            color: #091511;
            @media (min-width: 992px) {
                grid-column: 9 / 11;
            }
        }
        .cart-item-total {
            grid-column: 1 / 13;
            
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 16px;
            color: #091511;
            font-weight: bold;
            @media (min-width: 992px) {
                grid-column: 11 / 13;
                margin-left: auto;
            }
        }
    }
`;

const Checkout = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 8px 100px 8px;
    .cart-subtotal {
        width: 100%;
        font-family: franklin-gothic-urw,sans-serif;
        font-size: 18px;
        font-weight: bold;
        color: #091511;
        margin-left: auto;
        text-align: right;
        padding-bottom: 15px;
    }
    button {
        margin-left: auto;
    }
`;

const Table = styled.div`
    display: none;
`;

export default function Cart({ pageData, products }) {

    useEffect(() => {
       
        if (JSON.parse(window.localStorage.getItem("cartItemList"))) {
            const cartElement = document.querySelector('#cart');
            const variantIds = document.querySelectorAll('.variant-id');
            let localStorageCart = JSON.parse(window.localStorage.getItem("cartItemList"));
            localStorageCart.forEach((item, index) => {
                let localStorageCartSplit = item.split(':');
                let localStorageCartId = localStorageCartSplit[0];
                let localStorageCartQuantity = localStorageCartSplit[1];
                variantIds.forEach((item, index) => {
                    if (item.innerText === localStorageCartId) {
                        const cartItemElement = document.createElement('div');
                        const cartItemContentElement = document.createElement('div');
                        const productIdElement = document.createElement('div');
                        const productTitleElement = document.createElement('a');
                        const productPriceElement = document.createElement('h3');
                        const variantTitleElement = document.createElement('h4');
                        const variantImgElement = document.createElement('img');
                        const productQuantityWrapper = document.createElement('div');
                        const productQuantityElement = document.createElement('input');
                        const productQuantityPlus = document.createElement('img');
                        const productQuantityMinus = document.createElement('img');
                        const removalButton = document.createElement('button');
                        const productTotalElement = document.createElement('h3');
                        let productIdValue = item.innerText;
                        let productTitleValue = item.parentElement.parentElement.querySelector('#product-title').innerText;
                        let productHandleValue = item.parentElement.parentElement.querySelector('#product-handle').innerText;
                        let productPriceValue = item.parentElement.querySelector('#price').innerText;
                        let variantTitleValue = item.parentElement.querySelector('#variant-title').innerText;
                        let variantImgValue = item.parentElement.querySelector('#variant-image').innerText;
                        productIdElement.textContent = productIdValue;
                        productTitleElement.textContent = productTitleValue;
                        productPriceElement.textContent = '$' + formatCurrency(productPriceValue);
                        variantTitleElement.textContent = variantTitleValue;
                        removalButton.textContent = "Remove";
                        productTotalElement.textContent = '$' + formatCurrency(productPriceValue * localStorageCartQuantity);
                        cartItemElement.setAttribute('class', 'cart-item');
                        cartItemContentElement.setAttribute('class', 'cart-item-content');
                        productIdElement.setAttribute('id', 'cart-item-id');
                        variantImgElement.setAttribute('class', 'variant-img');
                        variantImgElement.setAttribute('src', variantImgValue);
                        productTitleElement.setAttribute('href', "/shop/" + productHandleValue);
                        productPriceElement.setAttribute('class', 'cart-item-price');
                        productTotalElement.setAttribute('class', 'cart-item-total');
                        productQuantityWrapper.setAttribute('class', 'quantity-box');
                        productQuantityElement.setAttribute('type', 'number');
                        productQuantityElement.setAttribute('id', 'quantity');
                        productQuantityElement.setAttribute('min', '1');
                        productQuantityElement.setAttribute('value', localStorageCartQuantity);
                        productQuantityElement.setAttribute('disabled', '');
                        productQuantityPlus.setAttribute('id', 'quantity-plus');
                        productQuantityMinus.setAttribute('id', 'quantity-minus');
                        productQuantityPlus.setAttribute('src', 'https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/plus.svg');
                        productQuantityMinus.setAttribute('src', 'https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/minus.svg');
                        removalButton.setAttribute('id', 'removal-button');
                        cartElement.appendChild(cartItemElement);
                        cartItemElement.appendChild(productIdElement);
                        cartItemElement.appendChild(variantImgElement);
                        cartItemElement.appendChild(cartItemContentElement);
                        cartItemContentElement.appendChild(productTitleElement);
                        cartItemContentElement.appendChild(variantTitleElement);
                        cartItemElement.appendChild(productQuantityWrapper);
                        cartItemContentElement.appendChild(removalButton);
                        productQuantityWrapper.appendChild(productQuantityMinus);
                        productQuantityWrapper.appendChild(productQuantityElement);
                        productQuantityWrapper.appendChild(productQuantityPlus);
                        cartItemElement.appendChild(productPriceElement);
                        cartItemElement.appendChild(productTotalElement);
                        removalButton.addEventListener('click', function() {
                            removeCartItem(cartItemElement, item.innerText);
                        });
                    }
                });
            });
        }
        

        const quantityPlus = document.querySelectorAll('#quantity-plus');
        const quantityMinus = document.querySelectorAll('#quantity-minus');

        quantityPlus.forEach((item, index) => {
            item.addEventListener('click', (clickedItem) => {
                let quantity = clickedItem.target.parentElement.querySelector('#quantity');
                let quantityValue = parseInt(quantity.value);
                quantityValue++;
                quantity.value = quantityValue;
                reCalculateItemTotals();
                calculateCartTotals();
            });
        });

        quantityMinus.forEach((item, index) => {
            item.addEventListener('click', (clickedItem) => {
                let quantity = clickedItem.target.parentElement.querySelector('#quantity');
                let quantityValue = parseInt(quantity.value);
                if (quantityValue === 1) {

                } else {
                    quantityValue--;
                    quantity.value = quantityValue;
                    reCalculateItemTotals();
                    calculateCartTotals();
                }
            });
        });

        const cartItems = document.querySelectorAll('.cart-item');
        const cartItemsTotalElement = document.querySelector('.cart-items-total');

        if (cartItems.length !== 0) {
            cartItemsTotalElement.innerText = "(" + cartItems.length + ' items)';
        }

        calculateCartTotals();
        toggleCartHasItems();
 
    }, []);

    return (
        <>
        <Content>
            <div className="wrapper">
              <h1>{pageData.acf.page_title}</h1>
              <div className="cart-empty">
                    <h2>{pageData.acf.cart_empty_title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: pageData.acf.cart_empty_message }} className="content" />
              </div>
              <h6 className="cart-items-total"></h6>
              <div className="explain-bar">
                <h6 className="items">Items</h6>
                <h6 className="quantity">Quantity</h6>
                <h6 className="item-price">Item Price</h6>
                <h6 className="total">Total</h6>
              </div>
            </div>
        </Content>
        
        <CartStyle id="cart">

        </CartStyle>

        <Checkout className="checkout-wrapper">
            <h6 className="cart-subtotal"></h6>
            <button id="checkout-button" className="green-button" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </Checkout>
        
        <Table>
            <div id="variant-table" className="variant-table">
                {products.products.map((product, index) => {
                    return (
                        <div className="product" key={index}>
                            <div id="product-id">
                                {product.id}
                            </div>
                            <div id="product-title">
                                {product.title}
                            </div>
                            <div id="product-handle">
                                {product.handle}
                            </div>
                            {product.variants.map((variant, index) => {
                                return (
                                    <>
                                        <div className="variant-table-item" key={index}>
                                            <div id="variant-id" className="variant-id">
                                                {variant.id}
                                            </div>
                                            <div id="variant-title">
                                                {variant.title}
                                            </div>
                                            <div id="price">
                                                {variant.price}
                                            </div>
                                            <div id="variant-image">
                                                {variant.featured_image ? variant.featured_image.src : ''}
                                                {product.images ? product.images[0].src : ''}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </Table>
        
        </>
    );
}