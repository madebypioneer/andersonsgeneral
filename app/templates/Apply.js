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
    padding: 100px 8px 0px 8px;
    overflow: hidden;
    
    .content-box {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        @media (min-width: 768px) {
            text-align: left;
        }
        h1 {
            width: 100%;
            font-size: 56px;
            line-height: 1;
            padding: 100px 0 100px 0;
            text-align: center;
        }
    }
    .form-box {
        max-width: 800px;
            margin: 0 auto;
        .cog-form__container {
            
           
            @media (min-width: 516px) {
                
            }
            @media (min-width: 992px) {
                
            }
            .el-input__inner {
                width: 100%;
                font-family: 'franklin-gothic-urw', sans-serif;
                font-size: 16px;
                padding: 8px;
                border-radius: 15px;
                background-color: #f3ede2;
                border: 1.5px solid #c6aa76;
                margin-right: 20px;
                margin-bottom: 20px;
                @media (min-width: 768px) {
                    margin-bottom: 0px;
                }
               
            }
            .el-textarea__inner {
                width: 100%;
                height: 100px !important;
                font-family: 'franklin-gothic-urw', sans-serif;
                font-size: 16px;
                padding: 8px;
                border-radius: 15px;
                background-color: #f3ede2;
                border: 1.5px solid #c6aa76;
                margin-bottom: 20px;
                @media (min-width: 768px) {
                    margin-bottom: 0px;
                }
            }
            .cog-button--navigation {
                margin-left: auto !important;
            }
            .cog-button {
                display: inline;
                background-color: #285C4D;
                font-family: 'franklin-gothic-urw', sans-serif;
                font-size: .875rem;
                font-weight: 700;
                text-transform: uppercase;
                color: #ffffff;
                padding: 0.6rem 2rem 0.6rem 2rem;
                border-radius: 0.5rem;
                transition: 0.25s;
            }
            .cog-button:hover {
                background-color: #204a3e;
                transition: 0.25s;
            }
        }
        
    }
`;

export default function Contact({ pageData }) {

    useEffect(() => {
        Cognito.load("forms", { id: "76" });
    }, []);

    const stayInTheKnow = pageData.global_sections[2];

    return (
        <>
        <Content>
            <div className="wrapper">
                <motion.div 
                    initial={{ x: 20 }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.5
                    }}
                    className="content-box"
                >
                    <h1>{pageData.acf.hero_section.title}</h1>
                </motion.div>
            </div>
            <motion.div 
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.5
                }}
                className="form-box"
            >
            <div className="cognito">
                <div className="loader">Form loading...</div>
            </div>
            </motion.div>
        </Content>

        <StayInTheKnow stayInTheKnow={stayInTheKnow} />

        </>
    );
}
