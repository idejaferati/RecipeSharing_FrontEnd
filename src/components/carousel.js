import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { PRODUCTS } from './../data/products';

const CarouselWrapper = styled.div`
  position: relative;
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
    left: 90px;
    top: 1%;
    transform: translateY(-50%);
  }
  .slick-next {
    background-image: url("../assets/expand-allow.png");
    left: 90px;
    top: 99%;
    transform: translateY(-50%);
  }
  .slick-prev:before {
    content: url("../assets/collapse-allow.png");
  }
  .slick-next:before {
    content: url("../assets/expand-allow.png");
  }
`;

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    arrows: true, // add arrows
    prevArrow: (
      <button type="button" className="slide-arrow slick-prev"></button>
    ), // set the previous arrow button
    nextArrow: (
      <button type="button" className="slide-arrow slick-next"></button>
    ), // set the next arrow button
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {PRODUCTS.map((product) => {
          return (
            <div>
              <h3>{product.productName}</h3>
              <img src={product.productImage} style={{
                width: '50px',
                height: '50px'
              }}/>
            </div>
          )
        })}
      </Slider>
    </CarouselWrapper>
  );
}

export default Carousel;
