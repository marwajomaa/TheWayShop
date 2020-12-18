import React from "react";
import { Badge, IconButton, makeStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const useStyles = makeStyles(() => ({
  Cart: {
    "@media (min-width: 900px)": {
      marginLeft: "20px",
    },
  },
}));

const { Cart } = useStyles;

export const ShoppingCart = () => {
  return (
    <>
      <IconButton>
        <Badge badgeContent={5} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </>
  );
};
