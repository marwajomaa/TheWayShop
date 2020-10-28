const express = require("express");
const router = express.Router();

const { getCategories } = require('../controllers/categoryCtrl')

router.get('/', getCategories)





module.exports = router;