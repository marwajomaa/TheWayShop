import React from "react";
import img from "../../../assets/img1.jpg";
import "./style.css";
function FeaturedProductsBox({ product }) {
  return (
    <div className="featured__container">
      <img src="img_avatar.png" alt="Avatar" className="featured__image" />
      <div className="featured__overlay">
        <div className="featured__text">{product.title}</div>
      </div>
    </div>
  );
}

export default FeaturedProductsBox;
