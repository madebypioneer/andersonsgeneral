'use client';

import Image from 'next/image';
import styled from 'styled-components';
import {
    Splide,
    SplideTrack,
    SplideSlide,
} from '@splidejs/react-splide';

import SearchBox from '../components/SearchBox.js';

function toggleFilters() {
    const sidebar = document.querySelector('.sidebar');
    const breadcrumbs = document.querySelector('.breadcrumbs');
    const sidebarFilterButton = document.querySelector(
        '.mobile-filter-toggle'
    );

    if (!sidebar || !sidebarFilterButton) {
        return;
    }

    if (sidebarFilterButton.innerText === 'FILTER') {
        sidebar.style.display = 'block';
        sidebarFilterButton.innerText = 'CLOSE FILTERS';
        sidebarFilterButton.style.backgroundColor = '#285C4D';
        sidebarFilterButton.style.color = '#ffffff';

        breadcrumbs?.scrollIntoView({
            behavior: 'smooth',
        });
    } else {
        sidebar.style.display = 'none';
        sidebarFilterButton.innerText = 'FILTER';
        sidebarFilterButton.style.backgroundColor = 'transparent';
        sidebarFilterButton.style.color = '#285C4D';

        breadcrumbs?.scrollIntoView({
            behavior: 'smooth',
        });
    }
}

function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return tags
            .map((tag) => String(tag).trim())
            .filter(Boolean);
    }

    return String(tags || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
}

function makeDomId(prefix, value, index) {
    const normalizedValue = String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `${prefix}-${normalizedValue || index}-${index}`;
}

const Content = styled.div`
    padding: 100px 8px 200px;

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
                font-family: franklin-gothic-urw-cond, sans-serif;
                text-transform: uppercase;
                padding-bottom: 5px;
            }
        }

        .mobile-filter-toggle {
            grid-column: 1 / 13;
            width: 100%;
            max-width: 500px;
            font-family: franklin-gothic-urw-cond, sans-serif;
            text-transform: uppercase;
            text-align: center;
            font-size: 18px;
            color: #285c4d;
            background-color: transparent;
            border: 2px solid #285c4d;
            border-radius: 8px;
            margin: 0 auto 25px;

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
                padding-bottom: 0;
            }

            @media (min-width: 1200px) {
                grid-column: 1 / 3;
            }

            h4 {
                font-family: franklin-gothic-urw-cond, sans-serif;
                text-transform: uppercase;
                font-size: 24px;
                border-bottom: 2px solid #091511;
                padding-bottom: 0;
            }

            .filter-type {
                display: flex;
                flex-wrap: wrap;
                line-height: 1;
                cursor: pointer;
                border-bottom: 2px solid #091511;
                transition: 0.25s;

                h5 {
                    font-family: franklin-gothic-urw-cond, sans-serif;
                    text-transform: uppercase;
                }

                .filter-type-title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 15px 5px;

                    &:hover {
                        background-color: rgba(40, 92, 77, 0.1);
                    }

                    h5,
                    svg {
                        pointer-events: none;
                    }
                }

                .filter-input {
                    position: relative;
                    width: 100%;
                    margin: 5px;
                    font-family: franklin-gothic-urw-cond, sans-serif;
                    text-transform: uppercase;
                    font-size: 14px;
                }

                label {
                    cursor: pointer;
                }

                input[type='checkbox'],
                input[type='radio'] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    position: relative;
                    vertical-align: middle;
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    border: 2px solid #091511;
                    outline: none;
                    cursor: pointer;
                }

                input[type='checkbox'] {
                    border-radius: 3px;
                }

                input[type='radio'] {
                    border-radius: 50%;
                }

                .checkmark,
                .radio {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    background-color: transparent;
                    border: 2px solid #091511;
                    pointer-events: none;
                }

                .checkmark {
                    border-radius: 3px;
                }

                .radio {
                    border-radius: 50%;
                }

                input[type='checkbox']:checked + .checkmark,
                input[type='radio']:checked + .radio {
                    background-color: #285c4d;
                    border-color: #091511;
                }

                .filter-input-group {
                    width: 100%;
                    opacity: 0;
                    max-height: 0;
                    overflow: hidden;
                    pointer-events: none;
                    transition: 0.25s;
                }

                .filter-input-group-open {
                    opacity: 1;
                    max-height: 2000px;
                    padding-bottom: 15px;
                    pointer-events: all;
                }

                .filter-type-icon {
                    transition: 0.25s;
                }

                .filter-type-icon-open {
                    transform: rotate(180deg);
                }
            }
        }

        .product-list {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 50px;
            grid-column: 1 / 13;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            padding: 0 8px;

            @media (min-width: 768px) {
                grid-template-columns: repeat(2, 1fr);
                grid-column: 4 / 13;
                max-width: 2000px;
                padding: 0 0 0 50px;
            }

            @media (min-width: 1200px) {
                grid-template-columns: repeat(3, 1fr);
                grid-column: 3 / 13;
            }

            .product {
                min-width: 0;
            }

            .product-text-content {
                padding: 0 8px;
                text-align: center;

                .brown-button {
                    display: inline-block;
                    border-width: 0;
                }
            }

            h2 {
                font-family: 'franklin-gothic-urw', sans-serif;
                line-height: 1.2;
                font-size: 1.2rem;
                font-weight: 700;
                color: #222222;
                padding: 50px 0 30px;
            }

            h3 {
                font-family: 'franklin-gothic-urw', sans-serif;
                font-size: 20px;
                font-weight: 400;
                color: #222222;
                padding: 0 0 15px;
            }

            .slide-single-img {
                position: relative;
                height: 350px;
                object-fit: contain;
                object-position: center;
                z-index: 1;
            }

            .product-filter-text {
                display: none;
            }

            .splide__pagination {
                bottom: -25px;
            }

            .splide__pagination__page {
                background-color: transparent;
                border: 1px solid #b79452;
                margin: 5px;
            }

            .splide__pagination__page.is-active {
                background-color: #b79452;
            }
        }

        .other-collections {
            grid-column: 1 / 13;
            padding: 100px 8px 0;
            text-align: center;

            @media (min-width: 768px) {
                grid-column: 4 / 13;
                padding: 100px 50px 0;
                text-align: left;
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
                font-family: franklin-gothic-urw-cond, sans-serif;
                text-transform: uppercase;
                font-size: 18px;
                padding: 15px;
                margin: 8px auto;

                @media (min-width: 768px) {
                    margin: 8px 20px 8px 0;
                    padding: 0;
                }
            }
        }
    }
`;

export default function CollectionSingle({
                                             productData = [],
                                             allProducts = [],
                                             collectionData = [],
                                         }) {
    const products = Array.isArray(productData)
        ? productData
        : [];

    const collections = Array.isArray(collectionData)
        ? collectionData
        : [];

    /*
     * Preserve the ordering supplied by Shopify.
     *
     * The old Admin API returned updated_at, but the new
     * Storefront API mapper does not. Sorting by updated_at
     * would therefore compare invalid dates.
     */
    const productTags = [];
    const sizeList = [];
    const colorList = [];

    products.forEach((product) => {
        normalizeTags(product.tags).forEach((tag) => {
            if (!productTags.includes(tag)) {
                productTags.push(tag);
            }
        });

        const options = Array.isArray(product.options)
            ? product.options
            : [];

        options.forEach((option) => {
            const optionName = String(
                option.name || ''
            ).toLowerCase();

            const values = Array.isArray(option.values)
                ? option.values
                : [];

            if (optionName === 'size') {
                values.forEach((value) => {
                    if (
                        value &&
                        !sizeList.includes(value)
                    ) {
                        sizeList.push(value);
                    }
                });
            }

            if (optionName === 'color') {
                values.forEach((value) => {
                    if (
                        value &&
                        !colorList.includes(value)
                    ) {
                        colorList.push(value);
                    }
                });
            }
        });
    });

    productTags.sort((a, b) => a.localeCompare(b));
    sizeList.sort((a, b) => a.localeCompare(b));
    colorList.sort((a, b) => a.localeCompare(b));

    function optionFilter() {
        const selectedSizeInput =
            document.querySelector(
                'input[name="size-selection"]:checked'
            );

        const selectedSize =
            selectedSizeInput?.value || '';

        const checkedFilterValues = Array.from(
            document.querySelectorAll(
                '.filter-checkbox:checked'
            )
        ).map((input) => input.value);

        const productElements =
            document.querySelectorAll('.product');

        productElements.forEach((productElement) => {
            const searchableValues = Array.from(
                productElement.querySelectorAll(
                    '.value-size-color-pair'
                )
            )
                .map((element) =>
                    element.textContent?.trim()
                )
                .filter(Boolean);

            const splitSearchableValues =
                searchableValues.flatMap((value) => [
                    value,
                    ...value
                        .split(' / ')
                        .map((part) => part.trim()),
                ]);

            const sizeMatches =
                !selectedSize ||
                splitSearchableValues.includes(
                    selectedSize
                );

            const checkedValuesMatch =
                checkedFilterValues.length === 0 ||
                checkedFilterValues.every((value) =>
                    splitSearchableValues.includes(
                        value
                    )
                );

            productElement.style.display =
                sizeMatches && checkedValuesMatch
                    ? 'block'
                    : 'none';
        });
    }

    function toggleFilterGroup(event) {
        const filterTitle =
            event.currentTarget;

        const filterType =
            filterTitle.parentElement;

        const inputGroup =
            filterType?.querySelector(
                '.filter-input-group'
            );

        const icon =
            filterTitle.querySelector(
                '.filter-type-icon'
            );

        inputGroup?.classList.toggle(
            'filter-input-group-open'
        );

        icon?.classList.toggle(
            'filter-type-icon-open'
        );
    }

    const collectionTitle =
        products[0]?.product_type ||
        'Products';

    return (
        <Content>
            <div className="wrapper">
                <div className="breadcrumbs">
                    <h6>
                        Anderson&apos;s Gear /{' '}
                        <span>{collectionTitle}</span>
                    </h6>
                </div>

                <div className="sidebar">
                    <div className="search-input-box">
                        <SearchBox data={allProducts} />
                    </div>

                    <h4>Filter</h4>

                    {sizeList.length > 0 && (
                        <div className="filter-type">
                            <div
                                className="filter-type-title"
                                onClick={
                                    toggleFilterGroup
                                }
                            >
                                <h5>Size</h5>

                                <svg
                                    className="filter-type-icon filter-type-icon-open"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.7071 16.493C12.3166 16.8835 11.6834 16.8835 11.2929 16.493L5.29289 10.493C4.90237 10.1025 4.90237 9.46931 5.29289 9.07878C5.68342 8.68826 6.31658 8.68826 6.70711 9.07878L12 14.3717L17.2929 9.07878C17.6834 8.68826 18.3166 8.68826 18.7071 9.07878C19.0976 9.46931 19.0976 10.1025 18.7071 10.493L12.7071 16.493Z"
                                        fill="#091511"
                                    />
                                </svg>
                            </div>

                            <div className="filter-input-group filter-input-group-open">
                                {sizeList.map(
                                    (size, index) => {
                                        const inputId =
                                            makeDomId(
                                                'size',
                                                size,
                                                index
                                            );

                                        return (
                                            <div
                                                className="filter-input"
                                                key={inputId}
                                            >
                                                <input
                                                    id={
                                                        inputId
                                                    }
                                                    type="radio"
                                                    className="size-radio"
                                                    name="size-selection"
                                                    value={
                                                        size
                                                    }
                                                    onChange={
                                                        optionFilter
                                                    }
                                                />

                                                <span className="radio" />

                                                <label
                                                    htmlFor={
                                                        inputId
                                                    }
                                                >
                                                    {size}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )}

                    {productTags.length > 0 && (
                        <div className="filter-type">
                            <div
                                className="filter-type-title"
                                onClick={
                                    toggleFilterGroup
                                }
                            >
                                <h5>Tags</h5>

                                <svg
                                    className="filter-type-icon"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.7071 16.493C12.3166 16.8835 11.6834 16.8835 11.2929 16.493L5.29289 10.493C4.90237 10.1025 4.90237 9.46931 5.29289 9.07878C5.68342 8.68826 6.31658 8.68826 6.70711 9.07878L12 14.3717L17.2929 9.07878C17.6834 8.68826 18.3166 8.68826 18.7071 9.07878C19.0976 9.46931 19.0976 10.1025 18.7071 10.493L12.7071 16.493Z"
                                        fill="#091511"
                                    />
                                </svg>
                            </div>

                            <div className="filter-input-group">
                                {productTags.map(
                                    (tag, index) => {
                                        const inputId =
                                            makeDomId(
                                                'tag',
                                                tag,
                                                index
                                            );

                                        return (
                                            <div
                                                className="filter-input"
                                                key={inputId}
                                            >
                                                <input
                                                    id={
                                                        inputId
                                                    }
                                                    type="checkbox"
                                                    className="filter-checkbox"
                                                    value={tag}
                                                    onChange={
                                                        optionFilter
                                                    }
                                                />

                                                <span className="checkmark" />

                                                <label
                                                    htmlFor={
                                                        inputId
                                                    }
                                                >
                                                    {tag}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )}

                    {colorList.length > 0 && (
                        <div className="filter-type">
                            <div
                                className="filter-type-title"
                                onClick={
                                    toggleFilterGroup
                                }
                            >
                                <h5>Color</h5>

                                <svg
                                    className="filter-type-icon"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.7071 16.493C12.3166 16.8835 11.6834 16.8835 11.2929 16.493L5.29289 10.493C4.90237 10.1025 4.90237 9.46931 5.29289 9.07878C5.68342 8.68826 6.31658 8.68826 6.70711 9.07878L12 14.3717L17.2929 9.07878C17.6834 8.68826 18.3166 8.68826 18.7071 9.07878C19.0976 9.46931 19.0976 10.1025 18.7071 10.493L12.7071 16.493Z"
                                        fill="#091511"
                                    />
                                </svg>
                            </div>

                            <div className="filter-input-group">
                                {colorList.map(
                                    (color, index) => {
                                        const inputId =
                                            makeDomId(
                                                'color',
                                                color,
                                                index
                                            );

                                        return (
                                            <div
                                                className="filter-input"
                                                key={inputId}
                                            >
                                                <input
                                                    id={
                                                        inputId
                                                    }
                                                    type="checkbox"
                                                    className="filter-checkbox"
                                                    value={
                                                        color
                                                    }
                                                    onChange={
                                                        optionFilter
                                                    }
                                                />

                                                <span className="checkmark" />

                                                <label
                                                    htmlFor={
                                                        inputId
                                                    }
                                                >
                                                    {color}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="mobile-filter-toggle"
                    onClick={toggleFilters}
                >
                    FILTER
                </button>

                <div className="product-list">
                    {products.map(
                        (product, productIndex) => {
                            /*
                             * The Storefront API only returns
                             * products published to this
                             * storefront. It does not return
                             * the old Admin API status field.
                             */
                            if (
                                product.title ===
                                'Test Item (JMA)'
                            ) {
                                return null;
                            }

                            const images = Array.isArray(
                                product.images
                            )
                                ? product.images.filter(
                                    (image) =>
                                        Boolean(
                                            image?.src
                                        )
                                )
                                : [];

                            const variants =
                                Array.isArray(
                                    product.variants
                                )
                                    ? product.variants
                                    : [];

                            const tags =
                                normalizeTags(
                                    product.tags
                                );

                            const productKey =
                                product.id ||
                                product.handle ||
                                productIndex;

                            return (
                                <div
                                    className="product"
                                    key={productKey}
                                >
                                    {images.length > 0 ? (
                                        <Splide
                                            hasTrack={
                                                false
                                            }
                                            options={{
                                                type: 'slide',
                                                perPage: 1,
                                                pagination:
                                                    true,
                                                arrows: false,
                                            }}
                                        >
                                            <SplideTrack>
                                                {images
                                                    .slice(
                                                        0,
                                                        8
                                                    )
                                                    .map(
                                                        (
                                                            image,
                                                            imageIndex
                                                        ) => (
                                                            <SplideSlide
                                                                key={
                                                                    image.src ||
                                                                    imageIndex
                                                                }
                                                                className="slide-single-img splide__slide"
                                                            >
                                                                <a
                                                                    href={`/products/${product.handle}`}
                                                                    aria-label={`View ${product.title}`}
                                                                >
                                                                    <Image
                                                                        src={
                                                                            image.src
                                                                        }
                                                                        alt={
                                                                            image.alt ||
                                                                            product.title
                                                                        }
                                                                        fill
                                                                        sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 100vw"
                                                                        style={{
                                                                            objectFit:
                                                                                'cover',
                                                                        }}
                                                                        quality={
                                                                            50
                                                                        }
                                                                    />
                                                                </a>
                                                            </SplideSlide>
                                                        )
                                                    )}
                                            </SplideTrack>
                                        </Splide>
                                    ) : (
                                        <div className="slide-single-img" />
                                    )}

                                    <div className="product-text-content">
                                        <h2>
                                            {
                                                product.title
                                            }
                                        </h2>

                                        {variants[0]
                                            ?.price && (
                                            <h3>
                                                $
                                                {
                                                    variants[0]
                                                        .price
                                                }
                                            </h3>
                                        )}

                                        <a
                                            className="brown-button"
                                            href={`/products/${product.handle}`}
                                        >
                                            See More
                                        </a>
                                    </div>

                                    <ul className="product-filter-text">
                                        {variants.map(
                                            (
                                                variant,
                                                variantIndex
                                            ) => {
                                                /*
                                                 * inventory_quantity was
                                                 * an Admin API field. The
                                                 * Storefront mapper supplies
                                                 * available instead.
                                                 */
                                                if (
                                                    variant.available ===
                                                    false
                                                ) {
                                                    return null;
                                                }

                                                return (
                                                    <li
                                                        className="value-size-color-pair"
                                                        key={
                                                            variant.id ||
                                                            variantIndex
                                                        }
                                                    >
                                                        {
                                                            variant.title
                                                        }
                                                    </li>
                                                );
                                            }
                                        )}

                                        {tags.map(
                                            (
                                                tag,
                                                tagIndex
                                            ) => (
                                                <li
                                                    className="value-size-color-pair"
                                                    key={`${tag}-${tagIndex}`}
                                                >
                                                    {tag}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            );
                        }
                    )}
                </div>

                <div className="other-collections">
                    <h5>More from our Shop</h5>

                    <ul>
                        {collections.map(
                            (
                                collection,
                                index
                            ) => {
                                if (
                                    !collection?.handle
                                ) {
                                    return null;
                                }

                                return (
                                    <a
                                        href={`/products/collections/${collection.handle}`}
                                        key={
                                            collection.id ||
                                            collection.handle ||
                                            index
                                        }
                                    >
                                        {
                                            collection.title
                                        }
                                    </a>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        </Content>
    );
}