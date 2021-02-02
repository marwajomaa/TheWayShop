import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Grid, Box, makeStyles, Typography } from "@material-ui/core";

import { GlobalState } from "../../GlobalState";
import BackLink from "../../components/BackLink";
import Button from "../../components/Button";
import ProductItem from "../Products/ProductItem";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert.js";
import Layout from "../../components/Layout";
import headPhoneImg from "../../assets/headPhone.jpg";
import labtopImg from "../../assets/img.jpg";
import hatsImg from "../../assets/hat.jpg";
import shoes from "../../assets/shoes.jpg";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    fontSize: "15%",
  },
  image: {
    maxWidth: "400px",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    margin: "20px auto",
    display: "block",
  },
  boxDetails: {
    maxWidth: "400px",
    padding: "20px",
    paddingTop: "30px",
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
  const search = useLocation().search;
  const category = new URLSearchParams(search).get("cat");
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [productDetails, setProductDetails] = useState({});
  const [img, setImage] = useState("");
  const [isLoggedIn] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const { addToCart } = state.userAPI;
  const [alert] = state.userAPI.alert;
  const [loading] = state.userAPI.loading;
  const [success] = state.userAPI.success;
  const [error] = state.userAPI.error;

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetails(product);
      });
    }
  }, [params.id, products]);

  useEffect(() => {
    const setImg = () => {
      if (category === "headphones") {
        setImage(headPhoneImg);
      } else if (category === "labtops") setImage(labtopImg);
      else if (category === "hats") setImage(hatsImg);
      else if (category === "shoes") setImage(shoes);
      else setImage(null);
    };
    setImg();
  }, []);

  const { title, description, sold, content, price, _id } = productDetails;
  const classes = useStyle();

  return (
    <Layout>
      <BackLink />
      {loading && <Loading />}
      {alert && isLoggedIn && (
        <Alert text={alert} type={success ? "success" : "error"} />
      )}
      {alert && !isLoggedIn && (
        <Alert text="Please login to continue buying" type="error" />
      )}

      {error && <Alert text={error} type="error" title="Error" />}
      <Grid container xs={12} className={classes.root}>
        <Grid xs={12} md={6}>
          <img src={img} alt={title} className={classes.image} />
        </Grid>
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
              text={!isAdmin && "Buy Now"}
              color="secondary"
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
    </Layout>
  );
}

export default ProductDetails;
