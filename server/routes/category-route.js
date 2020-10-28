const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth")
const authAdmin = require("../middlewares/auth-admin")

const { getCategories, createCategory } = require('../controllers/categoryCtrl')

router.get('/', getCategories)
router.post('/category', auth(), authAdmin(), createCategory)





module.exports = router;