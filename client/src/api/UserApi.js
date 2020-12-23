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
            setCart(res.data.cart);
            if (res.data.role === 1) setIsAdmin(true);
          }
        } catch (err) {
          console.error(err.response.data.error);
        }
      };
      getUser();
    }
  }, [token]);

  const addToCart = async (product) => {
    if (!isLoggedIn) alert("Please login to continue buying");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      const res = await axios.patch(
        "/api/users/cart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
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
