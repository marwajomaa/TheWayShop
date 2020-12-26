import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { GlobalState } from "../../GlobalState";
import img from "../../assets/img.jpg";
import Button from "../../components/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "650px",
    padding: "30px 10px",
    margin: "0 auto",
    position: "relative",
    boxShadow: "0 0 10px #eee",
    transform: "scaleY(0.98)",
  },
  boxDetails: {
    maxWidth: "400px",
    margin: "0 auto",
    paddingLeft: "20px",
    width: "100%",
  },
  title: {
    color: "darkblue",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  typography: {
    lineHeight: "1.5",
    margin: "15px 0",
    opacity: ".8",
    color: "darkblue",
  },
  deleteIcon: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "crimson",
    padding: "5px",
  },
  button: {
    width: "40px",
    height: "40px",
    border: "1px solid #eee",
  },
  total: {
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "650px",
    margin: "20px auto",
  },
}));

function Cart() {
  const globalState = useContext(GlobalState);
  const [cart, setCart] = globalState.userAPI.cart;
  const [isAdmin] = globalState.userAPI.isAdmin;
  const {
    removeProductFromCart,
    incrementQuantity,
    decrementQuantity,
  } = globalState.userAPI;
  const [total, setTotal] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (cart) {
      const getTotal = () => {
        const totalPrice = cart.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        setTotal(totalPrice);
      };
      getTotal();
    }
  }, [cart]);

  if (!cart) {
    return (
      <Typography variant="h3" component="p" style={{ textAlign: "center" }}>
        Cart is empty
      </Typography>
    );
  }

  return (
    <>
      <Paper elevation={0}>
        {cart.map((p) => {
          return (
            <Grid container xs={12} spacing={3} className={classes.root}>
              <Grid item xs={12} sm={6}>
                <img
                  src={img}
                  alt="img"
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.boxDetails}>
                <Typography
                  variant="h4"
                  component="h4"
                  gutterBottom={2}
                  className={classes.typography}
                >
                  {p.title}
                </Typography>
                <Typography variant="h6" component="span" gutterBottom={1}>
                  ${p.price * p.quantity}
                </Typography>
                <Typography variant="h5" component="p" gutterBottom={2}>
                  {p.description}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom={2}>
                  {p.content}
                </Typography>
                <Grid item spacing={1} gutterBottom={2}>
                  <Button
                    disabled={p.quantity === 1}
                    onClick={() => decrementQuantity(p._id)}
                    text="-"
                    className={classes.button}
                  />
                  <Typography
                    variant="h4"
                    component="span"
                    style={{ textAlign: "center", padding: "20px 15px" }}
                  >
                    {p.quantity}
                  </Typography>
                  <Button
                    onClick={() => incrementQuantity(p._id)}
                    text="+"
                    className={classes.button}
                  />
                </Grid>
                <IconButton
                  onClick={() => removeProductFromCart(p._id)}
                  className={classes.deleteIcon}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Paper>
      <Grid item className={classes.total}>
        <Typography variant="h4" component="p">
          Total: ${total}
        </Typography>
        <Button href="/cart" text="Payment" />
      </Grid>
    </>
  );
}

export default Cart;
