'use client';

import { useEffect } from 'react';
import { motion } from "framer-motion";
import styled from 'styled-components';
import StayInTheKnow from '../components/StayInTheKnow.js';

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

const Content = styled.div`
    .wrapper {
        max-width: 800px;
        margin: 0 auto;
        font-size: 16px;
        line-height: 1.5;
        white-space: pre-wrap;
        padding: 50px 8px 50px 8px;
        a {
            text-decoration: underline;
        }
        @media (min-width: 516px) {
            font-size: 18px;
        }
    }
`;

export default function Contact({ pageData }) {

    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
        <Content>
            <div className="wrapper">
                <div dangerouslySetInnerHTML={{ __html: pageData.acf.policy_text }}></div>
            </div>
        </Content>

        <StayInTheKnow stayInTheKnow={stayInTheKnow} />

        </>
    );
}
