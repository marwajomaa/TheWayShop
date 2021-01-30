import React, { Component } from "react";
import { makeStyles } from "@material-ui/core";
import Slider from "react-slick";
import "./styles.css";

const useStyles = makeStyles(() => ({
  img: {
    height: "400px",
    width: "100%",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
    "@media (max-width: 900px)": {
      height: "200px",
      width: "100%",
    },
  },
}));

const SliderImages = ({ images }) => {
  const classes = useStyles();
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
    <div style={{ margin: "0 auto", padding: "0" }}>
      <Slider {...settings}>
        {images &&
          images.map((img) => {
            return (
              <div style={{ width: "100%", height: "100%" }}>
                <img src={img} alt={img} className={classes.img} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default SliderImages;
