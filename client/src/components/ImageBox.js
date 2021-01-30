import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

function ImageBox({ product, img }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link
        to={`/product/detail/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "330px",
            margin: "0 auto",
            borderRadius: "10px",
            boxShadow: "10px 10px 5px #aaaaaa",
          }}
        >
          <img src={img} alt="img" style={{ width: "100%" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 10px",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
              }}
            >
              {product.title}
            </p>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
              }}
            >
              Sold:<strong>{product.sold}</strong>
            </p>
          </div>
        </div>
      </Link>
    </Grid>
  );
}

export default ImageBox;
