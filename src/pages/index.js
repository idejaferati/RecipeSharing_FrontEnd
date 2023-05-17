import React from "react";
import HomeImg from "../images/mainImg.jpg";
import Carousel from "./../components/carousel";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${HomeImg})`,
        backgroundSize: "cover",
        height: "100vh",
      }}>
      <div
        style={{
          position: "absolute",
          left: "400px",
          top: "400px",
          color: "#02211b",
        }}>
        <h6>PERSONALIZE YOUR EXPERIENCE</h6>
        <h1>What are your favorite cuisines?</h1>
      </div>
      <div
        style={{
          position: "absolute",
          right: "0px",
          top: "150px",
          width: "400px",
        }}>
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
