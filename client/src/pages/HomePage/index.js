import React from "react";
import HeroSection from "../../components/HeroSection";
import Categories from "../../components/Categories";
import BestSelling from "./BestSelling";

function HomePage() {
  return (
    <div style={{ width: "100%" }}>
      <HeroSection />
      <Categories />
      <BestSelling />
    </div>
  );
}

export default HomePage;
