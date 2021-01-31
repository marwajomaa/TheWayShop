import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import headPhoneImg from "../assets/img1.jpg";
import labtopImg from "../assets/img.jpg";
import hatsImg from "../assets/hats.jpg";
import shoes from "../assets/shoes.jpg";
import img from "../assets/images/blog-img-02.jpg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "330px",
    height: "350px",
    margin: "0 auto",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px 5px #eee",
    "&:hover": {
      boxShadow: "5px 5px 5px 5px #aaaaaa",
    },
  },
}));

function ImageBox({ product }) {
  const [img, setImage] = useState("");

  useEffect(() => {
    const setImg = () => {
      if (product.category === "headphones") {
        setImage(headPhoneImg);
      } else if (product.category === "labtops") setImage(labtopImg);
      else if (product.category === "hats") setImage(hatsImg);
      else if (product.category === "shoes") setImage(shoes);
      else setImage(img);
    };
    setImg();
  }, []);
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link
        to={`/product/detail/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={classes.root}>
          <div style={{ width: "100%", height: "270px" }}>
            <img
              src={img}
              alt="img"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <h3>{product.title}</h3>
            <h3>
              Sold:<strong>{product.sold}</strong>
            </h3>
          </div>
        </div>
      </Link>
    </Grid>
  );
}

export default ImageBox;
