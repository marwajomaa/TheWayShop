import { Typography, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from "./ProductItem";

function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  if (products.length === 0) return <div>loading...</div>;
  return (
    <Grid container spacing={3}>
      {products &&
        products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
    </Grid>
  );
}

export default Products;
