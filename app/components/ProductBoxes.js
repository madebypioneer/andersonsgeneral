'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';


const ProductBoxesStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(304px, 1fr));
    gap: 50px;
    max-width: 1020px;
    margin: 0 auto;
    text-align: center;
    .product-box {
        position: relative;
        min-width: 304px;
        max-width: 304px;
        min-height: 320px;
        max-height: 320px;
        margin: 0 auto 0px auto;
        &:hover {
            box-shadow: 0 0 37px -19px rgba(0,0,0,.50);
            .gradient {
                opacity: 1;
                transition: .3s;
            }
        }
        img {
            border-radius: 15px;
            z-index: 1;
        }
        .gradient {
            background: linear-gradient(0deg,hsla(0,0%,77%,.401),#19382f);
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 15px;
            opacity: .8;
            transition: .3s;
            z-index: 2;
        }
        h5 {
            position: absolute;
            top: 140px;
            width: 100%;
            font-family: franklin-gothic-urw,sans-serif;
            font-size: 1.875rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #ffffff;
            margin: 0 auto;
            z-index: 3;
        }
    }
`;



export default function ProductBoxes({ productBoxes }) {
    
    return (
        <ProductBoxesStyle>
            {productBoxes.acf.product_boxes.map((item, index) => {
                return (
                    <a href={item.link} className="product-box" key={index}>
                        <Image src={`${item.background_image.url}`} alt={`${item.background_image.alt}`} fill style={{ objectFit: 'cover' }} />
                        <div className="gradient"></div>
                        <h5>{item.title}</h5>
                    </a>
                )
            })}
        </ProductBoxesStyle>
    );
}