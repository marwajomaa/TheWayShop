const express = require("express");
const usersRouter = require("./usersRouter");
const categoriesRouter = require("./categoryRouter");
const router = express.Router();


router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);

module.exports = router;