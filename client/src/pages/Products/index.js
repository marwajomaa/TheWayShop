import React, { useContext, useState } from "react";
import { Typography, Grid, Checkbox } from "@material-ui/core";
import { GlobalState } from "../../GlobalState";
import ProductItem from "./ProductItem";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const { deleteProduct } = state.productsAPI;
  const [isCheck, setIsCheck] = useState(false);

  if (!products) return <Loading />;
  if (products.length === 0)
    return (
      <Typography variant="h4" component="h4" style={{ textAlign: "center" }}>
        No Products
      </Typography>
    );

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => (product.checked = !product.checked));
    setProducts([...products]);
    setIsCheck(true);
  };

  const DeleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id);
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" component="span">
          Check All
        </Typography>
        <Checkbox checked={isCheck} onChange={checkAll} />
        <Button
          text="Delete All"
          variant="outlined"
          color="secondary"
          onClick={DeleteAll}
        />
      </Grid>
      <Grid container xs={12} spacing={3}>
        {products &&
          products.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                handleCheck={handleCheck}
              />
            );
          })}
      </Grid>
    </Grid>
  );
}

export default Products;
