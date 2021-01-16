import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";
// import Alert from "../../components/Alert";

function UserApi() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
      setIsLoggedIn(true);
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get("/api/users/info", {
            headers: { Authorization: token },
          });
          setLoading(false);
          if (res) {
            localStorage.setItem("user", JSON.stringify(res.data));
            const user = localStorage.getItem("user");
            setUser(JSON.parse(user));
            setCart(res.data.cart);
            if (res.data.role === 1) setIsAdmin(true);
          }
        } catch (err) {
          setError(err.response.data.message);
        }
      };
      getUser();
    }
  }, []);

  useEffect(() => {
    const getHistory = async () => {
      try {
        console.log(user.role, "ppppppppppp");
        let history;

        if (user.role === 1) {
          setLoading(true);
          history = await axios.get("/api/payments", {
            headers: { Authorization: token },
          });
          setLoading(false);
          await setOrderHistory(history.data);
        } else {
          setLoading(true);
          history = await axios.get("/api/users/history", {
            headers: { Authorization: token },
          });
          setLoading(false);
          await setOrderHistory(history.data);
        }
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    getHistory();
  }, [callback, user, isAdmin]);

  const addToCart = async (product) => {
    if (!isLoggedIn)
      setAlert("You are not logged in. Please login to continue");
    let check;
    check = cart.every((item) => {
      return item._id !== product._id;
    });

    try {
      if (check) {
        setCart([...cart, { ...product, quantity: 1 }]);
        setLoading(true);
        const res = await axios.patch(
          "/api/users/cart",
          { cart: [...cart, { ...product, quantity: 1 }] },
          {
            headers: { Authorization: token },
          }
        );
        setLoading(false);
      } else {
        setAlert("This product already in the cart");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const cartUpdate = async (cart) => {
    try {
      setLoading(true);
      await axios.patch(
        "/api/users/cart",
        { cart: [...cart] },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const removeProductFromCart = async (id) => {
    if (window.confirm("Are you sure you want to remove this product")) {
      try {
        if (!isLoggedIn) {
          setAlert("Please login to continue...");
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
        setError(err.response.data.message);
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
    setLoading(true);
    await axios.post(
      "/api/payments",
      { cart, paymentID, address },
      { headers: { Authorization: token } }
    );
    setLoading(false);
    setCart([]);
    await cartUpdate([]);
    setCallback(!callback);
    setAlert("You have successfully placed an order");
    setSuccess(true);
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    alert: [alert, setAlert],
    loading: [loading, setLoading],
    success: [success, setSuccess],
    error: [error, setError],
    orderHistory: [orderHistory, setOrderHistory],
    addToCart,
    removeProductFromCart,
    incrementQuantity,
    decrementQuantity,
    tranSuccess,
    logout,
  };
}

export default UserApi;
