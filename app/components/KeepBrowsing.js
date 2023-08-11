'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Content = styled.div`
    text-align: center;
    padding: 0 8px 0 8px;
    h2 {
        font-family: modesto-condensed,serif;
        font-size: 3rem;
        text-transform: uppercase;
        color: #19382F;
        padding-bottom: 15px;
        @media (min-width: 992px) {
            font-size: 4rem;
        }
    }
    p {
        font-size: 24px;
        line-height: 1.2;
        padding-bottom: 30px;
        color: #19382F;
        max-width: 700px;
        margin: 0 auto;
    }
`;



export default function KeepBrowsing({ keepBrowsing }) {
    
    return (
        <Content>
            <h2>{keepBrowsing.acf.title}</h2>
            <p>{keepBrowsing.acf.paragraph}</p>
        </Content>
    );
}