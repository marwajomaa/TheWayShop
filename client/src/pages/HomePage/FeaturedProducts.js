import React, { useState, useEffect, useContext } from "react";

import { GlobalState } from "../../GlobalState";
import { Grid, makeStyles } from "@material-ui/core";
import Title from "../../components/Title";
import Button from "../../components/Button";
import FeaturedProductsBox from "./FeaturedProductsBox";

const useStyles = makeStyles(() => ({
  btn: {
    margin: "3px 10px",
    background: "red",
    color: "white",
    "&:hover": {
      background: "black",
    },
  },
}));

function FeaturedProducts() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const classes = useStyles();

  setTimeout(() => console.log(filteredProducts, 3000));

  const showProducts = (condition) => {
    let newArr;
    if (condition === "topFeatured") {
      newArr = products.slice(0, 3);
      setFilteredProducts(newArr);
    } else if (condition === "bestSelling") {
      newArr = products.sort((a, b) => b.sold - a.sold).slice(0, 3);
      setFilteredProducts([...newArr]);
    } else {
      setFilteredProducts(products);
    }
  };

  const featuredProducts =
    filteredProducts.length === 0
      ? products.map((product) => {
          return <FeaturedProductsBox product={product} />;
        })
      : filteredProducts.map((product) => {
          return <FeaturedProductsBox product={product} />;
        });

  return (
    <section>
      <Title text="Featured Products" />

      <Grid container xs={12}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            text="All"
            className={classes.btn}
            onClick={() => showProducts("all")}
          />
          <Button
            text="Top Featured"
            className={classes.btn}
            onClick={() => showProducts("topFeatured")}
          />
          <Button
            text="Best Seller"
            className={classes.btn}
            onClick={() => showProducts("bestSelling")}
          />
        </Grid>
        {featuredProducts}
      </Grid>
    </section>
  );
}

export default FeaturedProducts;
