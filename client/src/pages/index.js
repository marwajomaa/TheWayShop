import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Cart from "./Cart";
import NotFound from "./404Page";

function Pages({ style }) {
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
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/Cart" exact component={Cart} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default Pages;
