const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth");
const authAdmin = require("../middlewares/auth-admin");
const { getPayment, createPayment } = require("../controllers/paymentCtrl");

router.get("/", auth(), authAdmin(), getPayment);
router.post("/", auth(), createPayment);

module.exports = router;
