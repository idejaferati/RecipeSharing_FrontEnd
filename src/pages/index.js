import React from "react";
import HomeImg from "../images/mainImg.jpg";
import Carousel from "./../components/carousel";
import styled from "styled-components";

const StyledOuterContainer = styled.div`
  background-image: url(${HomeImg});
  background-size: cover;
  height: 100vh;
`;

const StyledTitleContainer = styled.div`
  position: absolute;
  left: 400px;
  top: 400px;
  color: #02211b;
`;

const StyledCarouselContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 150px;
  width: 400px;
`;

const Home = () => {
  return (
    <StyledOuterContainer>
      <StyledTitleContainer>
        <h6>PERSONALIZE YOUR EXPERIENCE</h6>
        <h1>What are your favorite cuisines?</h1>
      </StyledTitleContainer>
      <StyledCarouselContainer>
        <Carousel />
      </StyledCarouselContainer>
    </StyledOuterContainer>
  );
};

export default Home;
