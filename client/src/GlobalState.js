import React, { useState, useEffect, createContext } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserApi";
import CategoryAPI from "./api/CategoryAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const token = localStorage.getItem("token");
      // const token = await axios.get("/api/refresh_token")
      setToken(token);
    }
  }, [token]);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoryAPI: CategoryAPI(token),
    callback: [callback, setCallback],
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
