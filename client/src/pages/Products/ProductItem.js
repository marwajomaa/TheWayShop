import React from "react";
import { Grid } from "@material-ui/core";
import Card from "../../components/Card";

function ProductItem({ product }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card product={product} />
    </Grid>
  );
}

export default ProductItem;
