import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function UserApi() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      try {
        if (isAdmin) {
          await axios.get("/api/payments", {
            headers: { Authorization: token },
          });
        } else {
          const history = await axios.get("/api/users/history", {
            headers: { Authorization: token },
          });
          setOrderHistory(history.data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getHistory();
  }, [callback]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const res = localStorage.getItem("user");
    // const user = JSON.parse(res);

    if (token) {
      setToken(token);
      setIsLoggedIn(true);
      const getUser = async () => {
        try {
          const res = await axios.get("/api/users/info", {
            headers: { Authorization: token },
          });
          if (res) {
            localStorage.setItem("user", JSON.stringify(res.data));
            const user = localStorage.getItem("user");
            setUser(JSON.parse(user));
            setCart(res.data.cart);
            if (res.data.role === 1) setIsAdmin(true);
          }
        } catch (err) {
          console.error(err.response.data.error);
        }
      };
      getUser();
    }
  }, []);

  const addToCart = async (product) => {
    if (!isLoggedIn) alert("Please login to continue buying");
    let check;
    check = cart.every((item) => {
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

  const cartUpdate = async (cart) => {
    try {
      await axios.patch(
        "/api/users/cart",
        { cart: [...cart] },
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.warn(err.message);
    }
  };

  const removeProductFromCart = async (id) => {
    if (window.confirm("Are you sure you want to remove this product")) {
      try {
        if (!isLoggedIn) {
          alert("Please login to continue...");
          history.push("/login");
        }

        cart.forEach((item, index) => {
          if (item._id === id) {
            cart.splice(index, 1);
          }
        });

        setCart([...cart]);
        cartUpdate();
      } catch (err) {
        console.warn(err.message);
      }
    }
  };

  const incrementQuantity = (id) => {
    cart.forEach((item) => {
      if (item._id === id) item.quantity += 1;
    });
    setCart([...cart]);
    cartUpdate(cart);
  };

  const decrementQuantity = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    cartUpdate(cart);
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    await axios.post(
      "/api/payments",
      { cart, paymentID, address },
      { headers: { Authorization: token } }
    );
    setCart([]);
    await cartUpdate([]);
    setCallback(!callback);
    alert("You have successfully placed an order");
  };

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    orderHistory: [orderHistory, setOrderHistory],
    addToCart,
    removeProductFromCart,
    incrementQuantity,
    decrementQuantity,
    tranSuccess,
  };
}

export default UserApi;
