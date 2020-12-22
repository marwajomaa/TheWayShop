import React, { useEffect, useState } from "react";
import axios from "axios";

function UserApi(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const getUser = async () => {
        try {
          const res = await axios.get("/api/users/info", {
            headers: { Authorization: token },
          });
          if (res) {
            setUser(res.data);
            if (res.data.role === 1) setIsAdmin(true);
          }
        } catch (err) {
          alert(err.response.data.error);
        }
      };
      getUser();
    }
  }, [token]);

  const addToCart = (product) => {
    console.log(product, "prrrrrrroduct");
    if (!isLoggedIn) alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product already in the shopping cart");
    }
  };

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    addToCart,
  };
}

export default UserApi;
