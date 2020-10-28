const express = require("express");
const router = express.Router();
const auth = require("../middlewares/check-auth")
const authAdmin = require("../middlewares/auth-admin")

const { getCategories, createCategory, getCategory, updateCategory, deleteCategory} = require('../controllers/categoryCtrl')

router.get('/', getCategories)

router.post('/category', auth(), authAdmin(), createCategory)
router.get('/category/:id', auth(), authAdmin(), getCategory)
router.patch('/category/:id', auth(), authAdmin(), updateCategory)
router.delete('/category/:id', auth(), authAdmin(), deleteCategory)





module.exports = router;