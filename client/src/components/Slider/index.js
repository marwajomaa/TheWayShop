import React, { Component } from "react";
import Slider from "react-slick";
import "./styles.css";

const SliderImages = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Slider {...settings} style={{ width: "100%", height: "100%" }}>
        {images &&
          images.map((img) => {
            return (
              <div style={{ width: "100%", height: "100%" }}>
                <img
                  src={img}
                  alt={img}
                  style={{
                    height: "600px",
                    width: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SliderImages;
