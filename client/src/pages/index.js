import React, { useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import OrderDetails from "./OrderHistory/OrderDetails";
import Categories from "./Categories";
import CreateProduct from "./CreateProduct";
import HomePage from "./HomePage";
import NotFound from "./404Page";

function Pages({ style }) {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin] = state.userAPI.isAdmin;
  console.log(state, "state");
  return (
    <div className={style}>
      <Switch>
        <Route path="/" exact path="/" component={HomePage} />
        <Route path="/" exact path="/products" component={Products} />
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
        <Route path="/cart" exact component={isLoggedIn ? Cart : Signup} />
        <Route
          path="/history"
          exact
          component={isLoggedIn ? OrderHistory : Signup}
        />
        <Route
          path="/categories"
          exact
          component={isAdmin ? Categories : NotFound}
        />
        <Route
          path="/create_product"
          exact
          component={isAdmin ? CreateProduct : NotFound}
        />
        <Route
          path="/edit_product/:id"
          exact
          component={isAdmin ? EditProduct : NotFound}
        />
        <Route
          path="/history/:id"
          exact
          component={isLoggedIn ? OrderDetails : NotFound}
        />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default Pages;
