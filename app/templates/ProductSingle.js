'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
    Splide,
    SplideTrack,
    SplideSlide,
} from '@splidejs/react-splide';

function getStoredCartItems() {
    try {
        const storedCart = JSON.parse(
            window.localStorage.getItem('cartItemList')
        );

        return Array.isArray(storedCart) ? storedCart : [];
    } catch {
        return [];
    }
}

function getStoredVariantId(item) {
    if (typeof item === 'string') {
        return item.split(':')[0];
    }

    return String(item?.id || item?.variantId || '');
}

function toggleCartHasItems() {
    const cartHasItems = document.querySelector('.cart-has-items');

    if (!cartHasItems) {
        return;
    }

    cartHasItems.classList.toggle(
        'cart-has-items-active',
        getStoredCartItems().length > 0
    );
}

function getVariantLabel(variant) {
    return (
        variant?.option2 ||
        variant?.option1 ||
        variant?.title ||
        ''
    );
}

function getVariantImages(productData, variant) {
    const productImages = productData?.images || [];
    const variantId = String(variant?.id || '');
    const variantLabels = new Set(
        [
            variant?.title,
            variant?.option1,
            variant?.option2,
        ].filter(Boolean)
    );

    const matchingImages = productImages.filter((image) =>
        image?.variant_ids?.map(String).includes(variantId) ||
        variantLabels.has(image?.alt)
    );

    const imagesToUse = matchingImages.length
        ? matchingImages
        : productImages;

    const uniqueImages = Array.from(
        new Map(
            imagesToUse
                .filter((image) => image?.src)
                .map((image) => [image.src, image])
        ).values()
    );

    if (uniqueImages.length) {
        return uniqueImages;
    }

    return productData?.image?.src
        ? [productData.image]
        : [];
}

function formatPrice(price) {
    const numericPrice = Number.parseFloat(price);

    return Number.isFinite(numericPrice)
        ? numericPrice.toFixed(2)
        : String(price || '');
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
                        .quantity-control {
                            display: flex;
                            align-items: center;
                            padding: 0;
                            background: transparent;
                            border: 0;
                        }
                    }
                }
                .variant-showcase-img-current {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .image-secondary-group {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .thumbnail-button {
                    display: block;
                    padding: 0;
                    background: transparent;
                    border: 0;
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
                    .main-image-frame {
                        position: absolute;
                        top: 0;
                        right: 15px;
                        bottom: 0;
                        left: 15px;
                        @media (min-width: 768px) {
                            right: 25px;
                            left: 25px;
                        }
                        @media (min-width: 992px) {
                            right: 50px;
                            left: 50px;
                        }
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
                        padding: 0;
                        background: transparent;
                        border: 0;
                        fill: #285c4d;
                        &:hover {
                            cursor: pointer;
                            fill: #204a3e;
                        }
                        svg {
                            width: 100%;
                            height: 100%;
                            fill: inherit;
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
    .variant-color-trigger {
        padding: 0;
        background: transparent;
        border: 0;
    }
    .variant-color-trigger-active .showcase-img-wrapper {
        border-color: #97783F;
        box-shadow: 0 0 0 2px #97783F;
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

const PRODUCT_GALLERY_OPTIONS = {
    type: 'slide',
    rewind: true,
    perPage: 6,
    perMove: 1,
    gap: '8px',
    pagination: false,
    arrows: false,
};

export default function ProductSingle({ productData }) {
    const variants = productData?.variants || [];
    const hasSizeOptions = variants.some(
        (variant) => Boolean(variant.option2)
    );

    const colorOptions = Array.from(
        new Map(
            variants.map((variant) => [
                getVariantLabel(variant),
                variant,
            ])
        ).entries()
    ).map(([label, variant]) => ({ label, variant }));

    const initialVariant = variants[0];
    const [selectedColor, setSelectedColor] = useState(
        getVariantLabel(initialVariant)
    );
    const [selectedSize, setSelectedSize] = useState(
        hasSizeOptions ? initialVariant?.option1 || '' : ''
    );
    const [activeImageIndex, setActiveImageIndex] =
        useState(0);
    const [quantity, setQuantity] = useState(1);
    const [cartNoticeVisible, setCartNoticeVisible] =
        useState(false);
    const cartNoticeTimer = useRef(null);

    const variantsForColor = variants.filter(
        (variant) =>
            getVariantLabel(variant) === selectedColor
    );

    const selectedVariant = (
        hasSizeOptions
            ? variantsForColor.find(
                (variant) =>
                    variant.option1 === selectedSize
            )
            : variantsForColor[0]
    ) || initialVariant;

    const sizeOptions = Array.from(
        new Set(
            variantsForColor
                .map((variant) => variant.option1)
                .filter(Boolean)
        )
    );

    const galleryImages = getVariantImages(
        productData,
        selectedVariant
    );
    const activeImage =
        galleryImages[activeImageIndex] || galleryImages[0];

    useEffect(() => () => {
        if (cartNoticeTimer.current) {
            clearTimeout(cartNoticeTimer.current);
        }
    }, []);

    function selectColor(label) {
        const firstVariantForColor = variants.find(
            (variant) =>
                getVariantLabel(variant) === label
        );

        setSelectedColor(label);
        setSelectedSize(
            hasSizeOptions
                ? firstVariantForColor?.option1 || ''
                : ''
        );
        setActiveImageIndex(0);
        setQuantity(1);
    }

    function selectSize(size) {
        setSelectedSize(size);
        setActiveImageIndex(0);
        setQuantity(1);
    }

    function showPreviousImage() {
        setActiveImageIndex((currentIndex) =>
            currentIndex === 0
                ? galleryImages.length - 1
                : currentIndex - 1
        );
    }

    function showNextImage() {
        setActiveImageIndex((currentIndex) =>
            (currentIndex + 1) % galleryImages.length
        );
    }

    function addToCart() {
        if (!selectedVariant || quantity < 1) {
            return;
        }

        const variantId = String(selectedVariant.id);
        const cartItems = getStoredCartItems().filter(
            (cartItem) =>
                getStoredVariantId(cartItem) !== variantId
        );

        const cartImage =
            getVariantImages(
                productData,
                selectedVariant
            )[0] || productData?.image;

        cartItems.push({
            id: variantId,
            quantity,
            title: productData.title || '',
            handle: productData.handle || '',
            variantTitle: selectedVariant.title || '',
            price: selectedVariant.price || '0.00',
            currencyCode:
                selectedVariant.currency_code || 'USD',
            image: cartImage?.src || '',
            imageAlt:
                cartImage?.alt || productData.title || '',
        });

        window.localStorage.setItem(
            'cartItemList',
            JSON.stringify(cartItems)
        );

        toggleCartHasItems();
        setCartNoticeVisible(true);

        if (cartNoticeTimer.current) {
            clearTimeout(cartNoticeTimer.current);
        }

        cartNoticeTimer.current = setTimeout(() => {
            setCartNoticeVisible(false);
        }, 2000);
    }

    return (
        <Content>
            <div className="wrapper">
                <div className="product-data">
                    <div className="variant-single variant-show">
                        <h1 className="mobile-product-title">
                            {productData.title}
                        </h1>

                        <div className="product-images">
                            <ul className="image-secondary-group desktop-secondary-images">
                                {galleryImages.map((image, imageIndex) => (
                                    <li key={image.src}>
                                        <button
                                            type="button"
                                            className="thumbnail-button"
                                            aria-label={
                                                'Show image ' +
                                                (imageIndex + 1) +
                                                ' of ' +
                                                galleryImages.length
                                            }
                                            onClick={() =>
                                                setActiveImageIndex(
                                                    imageIndex
                                                )
                                            }
                                        >
                                            <Image
                                                className={[
                                                    'variant-secondary-img',
                                                    imageIndex ===
                                                    activeImageIndex
                                                        ? 'variant-secondary-img-active'
                                                        : '',
                                                ].join(' ')}
                                                src={image.src}
                                                alt={image.alt || ''}
                                                width={80}
                                                height={80}
                                            />
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="variant-image-group">
                                {activeImage && (
                                    <div className="main-image-frame">
                                        <Image
                                            className="variant-showcase-img-current"
                                            src={activeImage.src}
                                            alt={
                                                activeImage.alt ||
                                                productData.title
                                            }
                                            fill
                                            sizes="(max-width: 767px) 100vw, 50vw"
                                            style={{ objectFit: 'cover' }}
                                            priority
                                        />
                                    </div>
                                )}

                                {galleryImages.length > 1 && (
                                    <div className="img-browse-arrows">
                                        <button
                                            type="button"
                                            className="img-browse-arrow"
                                            aria-label="Previous product image"
                                            onClick={showPreviousImage}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-71-71L376 280c13.3 0 24-10.7 24-24s-10.7-24-24-24l-182.1 0 71-71c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L119 239c-9.4 9.4-9.4 24.6 0 33.9L231 385z" />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="img-browse-arrow"
                                            aria-label="Next product image"
                                            onClick={showNextImage}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {galleryImages.length > 0 && (
                                <Splide
                                    key={selectedColor}
                                    hasTrack={false}
                                    options={PRODUCT_GALLERY_OPTIONS}
                                    aria-label="Product image thumbnails"
                                    className="image-secondary-group mobile-secondary-images"
                                >
                                    <SplideTrack>
                                        {galleryImages.map(
                                            (image, imageIndex) => (
                                                <SplideSlide
                                                    key={image.src}
                                                    className="slide-single-img"
                                                >
                                                    <button
                                                        type="button"
                                                        className="thumbnail-button"
                                                        aria-label={
                                                            'Show image ' +
                                                            (imageIndex + 1) +
                                                            ' of ' +
                                                            galleryImages.length
                                                        }
                                                        onClick={() =>
                                                            setActiveImageIndex(
                                                                imageIndex
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            className={[
                                                                'variant-secondary-img',
                                                                imageIndex ===
                                                                activeImageIndex
                                                                    ? 'variant-secondary-img-active'
                                                                    : '',
                                                            ].join(' ')}
                                                            src={image.src}
                                                            alt={image.alt || ''}
                                                            width={80}
                                                            height={80}
                                                        />
                                                    </button>
                                                </SplideSlide>
                                            )
                                        )}
                                    </SplideTrack>
                                </Splide>
                            )}
                        </div>

                        <div className="product-content-box">
                            <h1 className="desktop-product-title">
                                {productData.title}
                            </h1>
                            <div className="variant-id">
                                {selectedVariant?.id}
                            </div>
                            <h2 className="price">
                                {'$' + formatPrice(
                                    selectedVariant?.price
                                )}
                            </h2>
                            <h6 className="color-to-search">
                                {selectedColor}
                            </h6>

                            {colorOptions.length > 1 && (
                                <div className="variant-trigger-wrapper">
                                    {colorOptions.map(
                                        ({ label, variant }) => {
                                            const colorImage =
                                                getVariantImages(
                                                    productData,
                                                    variant
                                                )[0];

                                            return (
                                                <button
                                                    type="button"
                                                    key={label}
                                                    className={[
                                                        'variant-color-trigger',
                                                        label === selectedColor
                                                            ? 'variant-color-trigger-active'
                                                            : '',
                                                    ].join(' ')}
                                                    aria-label={
                                                        'Select ' + label
                                                    }
                                                    aria-pressed={
                                                        label === selectedColor
                                                    }
                                                    onClick={() =>
                                                        selectColor(label)
                                                    }
                                                >
                                                    <span className="showcase-img-wrapper">
                                                        {colorImage && (
                                                            <Image
                                                                className="variant-showcase-img"
                                                                src={colorImage.src}
                                                                alt=""
                                                                fill
                                                                sizes="48px"
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                                quality={25}
                                                            />
                                                        )}
                                                    </span>
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            )}

                            {hasSizeOptions && (
                                <>
                                    <h6>Select a Size</h6>
                                    <div className="size-list">
                                        {sizeOptions.map((size) => (
                                            <button
                                                type="button"
                                                key={size}
                                                className={[
                                                    'size-option',
                                                    size === selectedSize
                                                        ? 'size-option-active'
                                                        : '',
                                                ].join(' ')}
                                                aria-pressed={
                                                    size === selectedSize
                                                }
                                                onClick={() =>
                                                    selectSize(size)
                                                }
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="quantity-box">
                                <h6>Quantity</h6>
                                <button
                                    type="button"
                                    className="quantity-control"
                                    aria-label="Decrease quantity"
                                    onClick={() =>
                                        setQuantity((current) =>
                                            Math.max(1, current - 1)
                                        )
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
                                    value={quantity}
                                    aria-label="Quantity"
                                    disabled
                                />
                                <button
                                    type="button"
                                    className="quantity-control"
                                    aria-label="Increase quantity"
                                    onClick={() =>
                                        setQuantity(
                                            (current) => current + 1
                                        )
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

                            <button
                                type="button"
                                onClick={addToCart}
                                className="green-button add-to-cart-button"
                            >
                                Add to cart
                            </button>
                            <div
                                className={[
                                    'cart-interaction',
                                    cartNoticeVisible
                                        ? 'cart-interaction-show'
                                        : '',
                                ].join(' ')}
                                role="status"
                                aria-live="polite"
                            >
                                added to cart
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}
