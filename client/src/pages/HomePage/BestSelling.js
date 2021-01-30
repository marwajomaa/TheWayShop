import React, { useState, useEffect, useContext } from "react";
import { Grid, Box } from "@material-ui/core";

import { GlobalState } from "../../GlobalState";
import Title from "../../components/Title";
import ImageBox from "../../components/ImageBox";
import img from "../../assets/img.jpg";

function BestSelling() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;

  const besSelling = products.sort((a, b) => b.sold - a.sold).slice(0, 3);

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Title text="BEST SELLING" />
        <Grid container xs={12}>
          {besSelling.map((product) => {
            {
              console.log(product);
            }
            return <ImageBox product={product} img={img} />;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BestSelling;
