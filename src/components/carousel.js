import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_PATH } from "../constants";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledCarouselWrapper = styled.div`
  position: relative;
  width: 90%;

  .slick-prev,
  .slick-next {
    position: absolute;
    cursor: pointer;
    z-index: 1;
    background-color: #5fd9c2;
    padding: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .slick-prev {
    background-image: url("../assets/collapse-allow.png");
    top: 50%;
    left: -40px;
    transform: translate(-50%, -50%);
  }
  .slick-next {
    background-image: url("../assets/expand-allow.png");
    top: 50%;
    right: -40px;
    transform: translate(50%, -50%);
  }

  .slick-slide > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
`;

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`;

function Carousel() {
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    axios
      .get(API_PATH + "cuisines")
      .then((response) => {
        setCuisines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cuisines:", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <button type="button" className="slide-arrow slick-prev">
        Prev
      </button>
    ),
    nextArrow: (
      <button type="button" className="slide-arrow slick-next">
        Next
      </button>
    ),
  };

  return (
    <Container>
      <StyledCarouselWrapper>
        <Slider {...settings}>
          {cuisines.map((cuisine) => (
            <div key={cuisine.name}>
              <Link
                style={{ color: "black" }}
                to="http://localhost:3000/cuisines">
                <h2 style={{ textTransform: "uppercase", color: "black" }}>
                  {cuisine.name}
                </h2>
              </Link>
            </div>
          ))}
        </Slider>
      </StyledCarouselWrapper>
    </Container>
  );
}

export default Carousel;
