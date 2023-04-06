import React from 'react';
import styled from "styled-components";

const FooterStl = styled.footer`
background-color: #ffffff;
bottom: 0;
left: 0;
right: 0;
padding: 8px;
text-align: center;
color: #02211b;
position: fixed;
`;


const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>
        <FooterStl>{`©  ${year} Dishcovery - Discover new tastes every day. All rights reserved`}</FooterStl>
        </footer>;
  };
  
  export default Footer;