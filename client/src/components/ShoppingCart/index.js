import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Badge, IconButton, makeStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { GlobalState } from "../../GlobalState";

export const useStyles = makeStyles(() => ({
  Cart: {
    "@media (min-width: 900px)": {
      marginLeft: "20px",
    },
  },
}));

const { Cart } = useStyles;

export const ShoppingCart = () => {
  const globalState = useContext(GlobalState);
  const [isLoggedIn] = globalState.token;
  const [cart] = globalState.userAPI.cart;
  const [isAdmin] = globalState.userAPI.isAdmin;
  return (
    <Link to="/cart">
      <IconButton>
        {!isAdmin ? (
          <Badge
            badgeContent={cart.length && isLoggedIn ? cart.length : 0}
            color="secondary"
          >
            <ShoppingCartIcon />
          </Badge>
        ) : (
          <Badge badgeContent={0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        )}
      </IconButton>
    </Link>
  );
};
