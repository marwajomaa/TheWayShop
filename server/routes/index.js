const express = require("express");
const usersRouter = require("./users-route");
const categoriesRouter = require("./category-route");
const router = express.Router();


router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);

module.exports = router;