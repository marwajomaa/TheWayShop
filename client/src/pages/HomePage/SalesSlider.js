import React from "react";
import Slider from "../../components/Slider";
import Title from "../../components/Title";
import img1 from "../../assets/images/instagram-img-01.jpg";
import img2 from "../../assets/images/instagram-img-02.jpg";
import img3 from "../../assets/images/instagram-img-03.jpg";
import img4 from "../../assets/images/instagram-img-04.jpg";
import img5 from "../../assets/images/instagram-img-05.jpg";
import img6 from "../../assets/images/instagram-img-06.jpg";
import img7 from "../../assets/images/instagram-img-07.jpg";
import img8 from "../../assets/images/instagram-img-08.jpg";
import img9 from "../../assets/images/instagram-img-09.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function Sales() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Title text="OUR SALES" />
      <div
        style={{
          width: "100%",
          height: "250px",
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "10px 0",
          margin: "20px auto",
          alignItems: "center",
        }}
      >
        <Slider images={images} settings={settings} />
      </div>
    </div>
  );
}

export default Sales;
