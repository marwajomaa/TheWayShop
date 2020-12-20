import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import ProductsAPI from "./api/ProductsAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const token = localStorage.getItem("token");
      setToken(token);
      setTimeout(() => console.log(token), 3000);
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
