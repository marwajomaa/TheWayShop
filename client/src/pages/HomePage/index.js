import React from "react";
import HeroSection from "../../components/HeroSection";
import Categories from "../../components/Categories";
import BestSelling from "./BestSelling";
import FeaturedProducts from "./FeaturedProducts";

function HomePage() {
  return (
    <div style={{ width: "100%" }}>
      <HeroSection />
      <Categories />
      <BestSelling />
      <FeaturedProducts />
    </div>
  );
}

export default HomePage;
