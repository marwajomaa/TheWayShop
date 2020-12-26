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
      console.log(res.data.cart);
    } else {
      alert("This product already in the shopping cart");
    }
  };

  const cartUpdate = async () => {
    try {
      await axios.patch(
        "/api/users/cart",
        { cart: [...cart] },
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      console.warn(err.response.data.error);
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
    cartUpdate();
  };

  const decrementQuantity = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    cartUpdate();
  };

  const tranSuccess = async (payment) => {
    console.log(payment, "payment");
  };

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    cart: [cart, setCart],
    addToCart,
    removeProductFromCart,
    incrementQuantity,
    decrementQuantity,
    tranSuccess,
  };
}

export default UserApi;
