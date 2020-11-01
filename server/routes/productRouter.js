const express = require("express");
const router = express.Router();
const auth = require('../middlewares/check-auth')
const { getProducts, createProduct, updateProduct, deleteProduct} = require('../controllers/productCtrl')

router.get('/', getProducts)
router.post('/', createProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)




module.exports = router;