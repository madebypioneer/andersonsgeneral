'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';


const Content = styled.div`
   
    padding: 0 8px 0 8px;
    @media (min-width: 992px) {
        padding: 50px;
    }
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        background-color: #E4D7BE;
        border-radius: 15px;
        max-width: 1152px;
        margin: 0 auto;
        transform: translateY(80px);
        padding: 20px;
        text-align: center;
        justify-content: center;
        @media (min-width: 768px) {
            text-align: left;
            justify-content: space-between;
        }
        @media (min-width: 992px) {
            padding: 50px;
            transform: translateY(100px);
        }
    }
    .content {
        width: 100%;
        @media (min-width: 768px) {
            width: 40%;
        }
    }
    h6 {
        font-family: modesto-condensed,serif;
        font-size: 3rem;
        text-transform: uppercase;
        color: #19382F;
        line-height: 1;
        @media (min-width: 1200px) {
            font-size: 4rem;
        }
    }
    p {
        font-size: 18px;
        font-weight: 700;
        line-height: 1;
        color: #19382F;
        max-width: 700px;
        margin: 0 auto;
        padding: 20px 0 20px 0;
        @media (min-width: 768px) {
            padding: 0;
        }
    }
    .email-input {
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
            width: 200px;
            margin-bottom: 0px;
        }
        @media (min-width: 992px) {
            width: 250px;
        }
        @media (min-width: 1200px) {
            width: 300px;
        }
    }
`;



export default function StayInTheKnow({ stayInTheKnow }) {
    
    return (
        <Content>
            <div className="wrapper">
                <div className="content">
                    <h6>{stayInTheKnow.acf.title}</h6>
                    <p>{stayInTheKnow.acf.subtitle}</p>
                </div>
                <div className="">
                    <div id="mc_embed_signup">
                        <form action="https://andersonsgeneral.us9.list-manage.com/subscribe/post?u=78b8b5b73611362584197d1ea&amp;id=2d86122271" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                        <div id="mc_embed_signup_scroll" >
                            <h2></h2>
                            <div className="mc-field-group">
                            <div className="lg:flex">
                                <input type="email" defaultValue="" name="EMAIL" className="email-input" id="mce-EMAIL" placeholder="Your Email" />
                                <input type="submit" value="Sign Up Now" name="subscribe" id="mc-embedded-subscribe" className="green-button" />
                            </div>
                            </div>
                                <div id="mce-responses" className="clear foot">
                                    <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                                    <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                                </div>
                                <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_78b8b5b73611362584197d1ea_2d86122271" tabindex="-1" value="" /></div>
                                    <div className="optionalParent">
                                        <div className="flex clear foot">
                                            
                                        </div>
                                    </div>
                            </div>
                        </form>
                        </div>
                </div>
            </div>
        </Content>
    );
}