import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Box, makeStyles, Typography } from "@material-ui/core";

import { GlobalState } from "../../GlobalState";
import BackLink from "../../components/BackLink";
import img from "../../assets/img.jpg";
import Button from "../../components/Button";
import ProductItem from "../Products/ProductItem";
import Loading from "../../components/Loading";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "50px",
    fontSize: "15%",
  },
  image: {
    maxWidth: "400px",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    margin: "20px",
    display: "block",
  },
  boxDetails: {
    maxWidth: "400px",
    margin: "0 20px",
    paddingLeft: "20px",
    width: "100%",
  },
  title: {
    color: "darkblue",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  Typography: {
    lineHeight: "1.5",
    margin: "15px 0",
    opacity: ".8",
  },
}));

function ProductDetails() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [productDetails, setProductDetails] = useState([]);
  const [isLoggedIn] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const { addToCart } = state.userAPI;

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetails(product);
      });
    }
  }, [params.id, products]);

  const { title, description, sold, content, price, _id } = productDetails;
  const classes = useStyle();
  if (productDetails.length === 0) return <Loading />;

  return (
    <>
      <BackLink />
      <Grid container xs={12} className={classes.root}>
        <img src={img} alt={title} className={classes.image} />
        <Box item className={classes.boxDetails}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textPrimary"
            component="p"
            className={classes.Typography}
          >
            $ {price}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="p"
            className={classes.Typography}
          >
            {description}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="p"
            className={classes.Typography}
          >
            {content}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className={classes.Typography}
          >
            Sold: {sold}
          </Typography>
          {!isAdmin && (
            <Button
              style={{ marginTop: "20px" }}
              text={isLoggedIn && !isAdmin ? "Buy Now" : "Login to buy"}
              color="primary"
              href={isLoggedIn ? "#" : "/signup"}
              onClick={() => addToCart(productDetails)}
            />
          )}
        </Box>
      </Grid>
      <Grid container xs={12} style={{ padding: "50px 0" }}>
        <Typography variant="h5" component="h5" className={classes.Typography}>
          Related Products
        </Typography>
        <Grid container xs={12}>
          {products.map((product) => {
            return (
              product.category === productDetails.category && (
                <ProductItem key={product._id} product={product} />
              )
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default ProductDetails;
