import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Cart from "./Cart";
import NotFound from "./404Page";

function Pages({ style }) {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.userAPI.isLoggedIn;
  console.log(state, "state");
  return (
    <div className={style}>
      <Switch>
        <Route path="/" exact path="/" component={Products} />
        <Route
          path="/"
          exact
          path="/product/detail/:id"
          component={ProductDetails}
        />
        <Route path="/login" exact component={isLoggedIn ? Products : Login} />
        <Route
          path="/signup"
          exact
          component={isLoggedIn ? Products : Signup}
        />
        <Route
          path="/edit_product/:id"
          exact
          component={isLoggedIn && EditProduct}
        />
        <Route path="/cart" exact component={isLoggedIn ? Cart : Signup} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default Pages;
