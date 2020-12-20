import React, { useState, useEffect, createContext } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserApi";

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
    userAPI: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
