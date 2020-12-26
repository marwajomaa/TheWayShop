const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth");
const { refreshToken } = require("../helpers/createToken");
const {
  userRegister,
  loginUser,
  logout,
  getUser,
  updateCart,
} = require("../controllers/userCtrl");

router.post("/register", userRegister);

router.get("/refresh_token", refreshToken);

router.post("/login", loginUser);

// router.get("/check-auth", auth());

router.get("/info", auth(), getUser);

router.patch("/cart", auth(), updateCart);

router.get("/logout", logout);

module.exports = router;
