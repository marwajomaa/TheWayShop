import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import hero from "../../assets/banner-01.jpg";

import Button from "../Button";

const StyledHero = styled("div")`
  background-image: url(${hero});
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  object-fit: contain;
  vertical-align: middle;
  position: relative;

  &:hover {
    opacity: 0.7;
  }
`;

const Container = styled("div")`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bolder;
  @media (max-width: 900px) {
    font-size: 1rem;
    font-weight: bold;
  }
`;

const Typography = styled("h1")`
  margin-bottom: 10px;
  text-align: center;
`;

function HeroSection() {
  return (
    <StyledHero>
      <Container>
        <Typography>
          Welcome to{" "}
          <strong style={{ display: "block", fontWeight: "bolder" }}>
            Thewayshop
          </strong>
        </Typography>
        <Typography style={{ fontSize: "18px", paddingBottom: "30px" }}>
          Want to shop online and have the best products?! You're at the right
          place
        </Typography>
        <Button
          color="red"
          text="Shop New"
          variant="contained"
          style={{
            width: "150px",
            fontWeight: "bold",
            color: "white",
            position: "absolute",
            right: "100px",
            position: "absolute",
            bottom: "30px",
            right: "20px",
            backgroundColor: "red",
          }}
          href="/products"
        />
      </Container>
    </StyledHero>
  );
}

export default HeroSection;
