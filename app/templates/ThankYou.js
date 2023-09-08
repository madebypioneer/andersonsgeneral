'use client';

import { motion } from "framer-motion";
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

const Content = styled.div`
    padding: 200px 8px 800px 8px;
    .wrapper {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        h1 {
          font-size: 40px;
          padding-bottom: 15px;
          @media (min-width: 768px) {
              font-size: 48px;
          }
        }
        p {
          font-size: 24px;
          font-weight: 200;
          line-height: 1.5;
          padding: 0 0 32px 0;
        }
      }
        @media (min-width: 992px) {
            
        }
    }
`;

export default function ThankYou({ pageData }) {

    let heroButtonLink = getButtonLink(pageData.acf.hero_section.button.link_to_where, pageData.acf.hero_section.button.onsite_link, pageData.acf.hero_section.button.offsite_link, pageData.acf.hero_section.button.file_link);

    return (
        <>
        <Content>
            <div className="wrapper">
              <h1>{pageData.acf.hero_section.title}</h1>
              <p>{pageData.acf.hero_section.description}</p>
              <a href={heroButtonLink}>
                  <div className="button">{pageData.acf.hero_section.button.text}</div>
              </a>
            </div>
        </Content>
        </>
    );
}