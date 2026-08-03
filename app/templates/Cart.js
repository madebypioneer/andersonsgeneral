'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

function parseStoredCart() {
    let storedCart;

    try {
        storedCart = JSON.parse(
            window.localStorage.getItem('cartItemList')
        );
    } catch {
        return [];
    }

    if (!Array.isArray(storedCart)) {
        return [];
    }

    const normalizedItems = storedCart
        .map((item) => {
            if (typeof item === 'string') {
                const [id, quantity] = item.split(':');

                return {
                    id: String(id || '').trim(),
                    quantity: Math.max(
                        1,
                        Number.parseInt(quantity, 10) || 1
                    ),
                };
            }

            return {
                id: String(
                    item?.id || item?.variantId || ''
                ).trim(),
                quantity: Math.max(
                    1,
                    Number.parseInt(
                        item?.quantity,
                        10
                    ) || 1
                ),
            };
        })
        .filter((item) => /^\d+$/.test(item.id));

    return Array.from(
        new Map(
            normalizedItems.map((item) => [
                item.id,
                item,
            ])
        ).values()
    );
}

function storeCart(items) {
    const storedItems = items.map(
        (item) => `${item.id}:${item.quantity}`
    );

    window.localStorage.setItem(
        'cartItemList',
        JSON.stringify(storedItems)
    );
}

function formatCurrency(amount) {
  // Ensure the input is treated as a number
  const numericAmount = parseFloat(amount);
  // Round to two decimal places using toFixed() method
  const roundedAmount = numericAmount.toFixed(2);
  // Return the formatted amount as a string
  return roundedAmount;
}

function updateHeaderCartState(hasItems) {
    const cartHasItems = document.querySelector('.cart-has-items');

    if (cartHasItems) {
        cartHasItems.classList.toggle(
            'cart-has-items-active',
            hasItems
        );
    }
}

function goBack() {
    window.history.back();
}

const Content = styled.div`
    .cart-function-buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 100px 8px 25px 8px;
        button {
            width: 100%;
            @media (min-width: 430px) {
                width: 49%;
                flex-wrap: no-wrap;
            }
        }
        @media (min-width: 992px) {
            display: none;
        }
    }
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0px 8px 0 8px;
        @media (min-width: 992px) {
           padding: 100px 8px 0 8px;
        }
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
        gap: 15px;
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
            grid-column: 1 / 5;
            width: 120px;
            height: 120px;
            object-fit: cover;
            @media (min-width: 992px) {
                grid-column: 1 / 1;
            }
        }
        .cart-item-content {
            grid-column: 5 / 13;
            padding: 0px 0 20px 0;
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
                border-width: 0px;
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
            .quantity-control {
                display: flex;
                align-items: center;
                padding: 0;
                background: transparent;
                border: 0;
            }
        }
        .cart-item-price {
            display: none;
            grid-column: 1 / 13;
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 16px;
            color: #091511;
            @media (min-width: 992px) {
                display: block;
                grid-column: 9 / 11;
            }
        }
        .cart-item-total {
            grid-column: 1 / 13;
            text-align: right;
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 16px;
            color: #091511;
            font-weight: bold;
            margin-top: -45px;
            pointer-events: none;
            @media (min-width: 992px) {
                grid-column: 11 / 13;
                margin-top: 0px;
                margin-left: auto;
                text-align: left;
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

export default function Cart({ pageData }) {
    const [cartItems, setCartItems] = useState(null);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadCart() {
            const lines = parseStoredCart();

            if (lines.length === 0) {
                setCartItems([]);
                return;
            }

            try {
                const response = await fetch('/api/cart-items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lines }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result?.error ||
                        'The cart items could not be loaded.'
                    );
                }

                if (!cancelled) {
                    const resolvedItems = result.items || [];

                    setCartItems(resolvedItems);
                    storeCart(resolvedItems);
                }
            } catch (error) {
                console.error('Unable to load the cart.', error);

                if (!cancelled) {
                    setLoadError(true);
                    setCartItems([]);
                }
            }
        }

        loadCart();

        return () => {
            cancelled = true;
        };
    }, []);

    const hasItems = Boolean(cartItems?.length);

    useEffect(() => {
        if (cartItems === null) {
            return;
        }

        const storedCartHasItems =
            loadError && parseStoredCart().length > 0;

        updateHeaderCartState(
            hasItems || storedCartHasItems
        );
    }, [cartItems, hasItems, loadError]);

    function changeQuantity(variantId, amount) {
        setCartItems((currentItems) => {
            const nextItems = currentItems.map((item) =>
                item.id === variantId
                    ? {
                        ...item,
                        quantity: Math.max(
                            1,
                            item.quantity + amount
                        ),
                    }
                    : item
            );

            storeCart(nextItems);

            return nextItems;
        });
    }

    function removeCartItem(variantId) {
        setCartItems((currentItems) => {
            const nextItems = currentItems.filter(
                (item) => item.id !== variantId
            );

            storeCart(nextItems);

            return nextItems;
        });
    }

    function handleCheckout() {
        if (!hasItems) {
            return;
        }

        const preparedCart = cartItems
            .map(
                (item) =>
                    `${item.id}:${item.quantity}`
            )
            .join(',');

        window.localStorage.removeItem('cartItemList');
        window.location.href =
            `https://andersons-general-store-statesboro.myshopify.com/cart/${preparedCart}`;
    }

    const subtotal = (cartItems || []).reduce(
        (total, item) =>
            total +
            Number.parseFloat(item.price) *
            item.quantity,
        0
    );

    return (
        <>
            <Content>
                <div className="cart-function-buttons">
                    <button
                        className="outline-button"
                        onClick={goBack}
                    >
                        Continue Shopping
                    </button>
                    <button
                        id="top-checkout-button"
                        className={
                            `green-button ${
                                hasItems ? '' : 'hidden'
                            }`
                        }
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
                <div className="wrapper">
                    <h1>{pageData.acf.page_title}</h1>

                    {cartItems === null && (
                        <div className="cart-empty">
                            <h2>Loading your cart...</h2>
                        </div>
                    )}

                    {loadError && (
                        <div className="cart-empty">
                            <h2>We could not load your cart</h2>
                            <div className="content">
                                <p>
                                    Please refresh the page and try again.
                                </p>
                            </div>
                        </div>
                    )}

                    {cartItems !== null &&
                        !loadError &&
                        !hasItems && (
                            <div className="cart-empty">
                                <h2>
                                    {pageData.acf.cart_empty_title}
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            pageData.acf
                                                .cart_empty_message,
                                    }}
                                    className="content"
                                />
                            </div>
                        )}

                    {hasItems && (
                        <h6 className="cart-items-total">
                            ({cartItems.length}{' '}
                            {cartItems.length === 1
                                ? 'item'
                                : 'items'})
                        </h6>
                    )}

                    <div
                        className={
                            `explain-bar ${
                                hasItems ? '' : 'hidden'
                            }`
                        }
                    >
                        <h6 className="items">Items</h6>
                        <h6 className="quantity">Quantity</h6>
                        <h6 className="item-price">Item Price</h6>
                        <h6 className="total">Total</h6>
                    </div>
                </div>
            </Content>

            <CartStyle id="cart">
                {(cartItems || []).map((item) => (
                    <div className="cart-item" key={item.id}>
                        <div id="cart-item-id">{item.id}</div>
                        <Image
                            className="variant-img"
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            width={120}
                            height={120}
                        />
                        <div className="cart-item-content">
                            <a href={`/products/${item.handle}`}>
                                {item.title}
                            </a>
                            <h4>{item.variantTitle}</h4>
                            <button
                                type="button"
                                onClick={() =>
                                    removeCartItem(item.id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                        <div className="quantity-box">
                            <button
                                type="button"
                                className="quantity-control"
                                aria-label={`Decrease quantity for ${item.title}`}
                                onClick={() =>
                                    changeQuantity(item.id, -1)
                                }
                            >
                                <Image
                                    src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/minus.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                aria-label={`Quantity for ${item.title}`}
                                disabled
                            />
                            <button
                                type="button"
                                className="quantity-control"
                                aria-label={`Increase quantity for ${item.title}`}
                                onClick={() =>
                                    changeQuantity(item.id, 1)
                                }
                            >
                                <Image
                                    src="https://inside2.andersonsgeneral.com/wp-content/uploads/2023/08/plus.svg"
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                            </button>
                        </div>
                        <h3 className="cart-item-price">
                            ${formatCurrency(item.price)}
                        </h3>
                        <h3 className="cart-item-total">
                            ${formatCurrency(
                                item.price * item.quantity
                            )}
                        </h3>
                    </div>
                ))}
            </CartStyle>

            <Checkout
                className={
                    `checkout-wrapper ${
                        hasItems ? '' : 'hidden'
                    }`
                }
            >
                <h6 className="cart-subtotal">
                    Estimated Subtotal: ${formatCurrency(subtotal)}
                </h6>
                <button
                    id="checkout-button"
                    className="green-button"
                    onClick={handleCheckout}
                >
                    PROCEED TO CHECKOUT
                </button>
            </Checkout>
        </>
    );
}
