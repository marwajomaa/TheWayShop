import { Typography, makeStyles } from "@material-ui/core";
import React from "react";
import img from "../../assets/logo.png";

const useStyles = makeStyles(() => ({
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 500,
    color: "red",
    textAlign: "left",
  },
}));

const { logo } = useStyles;

export const Logo = (
  <div>
    <img src={img} alt="logo" />
  </div>
);
