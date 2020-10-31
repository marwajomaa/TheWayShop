const Products = require('../models/productModel')
const httpError = require('../middlewares/http-error')


exports.getAllProducts = async (req, res, next) => {
    try {
      const products = await Products.find()

      if (!products) return next(new httpError('No products found'), 400)

      res.status(200).json({status: "success", products})
    } catch (err) {
        return next(new httpError('Something went wrong, please try again'), 500)
    }
}

exports.createProduct = async (req, res, next) => {    
    try {
      const {product_id, title, description, content, images, category, price} = req.body;
    //   if(!images) return next(new httpError('No images uploaded'), 400)
    const product = await Products.findOne({product_id})

    if (product) return next(new httpError('This product already exists'), 400)

    const newProduct = new Products({
        product_id, title: title.toLowerCase(), description, content, images, category, price
    })
    await newProduct.save()

    res.status(200).json({msg: 'Product created successfully', newProduct})

    } catch (err) {
        console.log(err.message);
        return next(new httpError('Something went wrong, please try again'), 500)
    }
}
exports.updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const {title, description, content, images, category, price} = req.body;

      const product = await Products.findByIdAndUpdate({_id:id}, {title, description, content, images, category, price})

      if (!product) return next(new httpError('No products found'), 400)

      res.status(200).json({status: "success", msg: 'Product updated successfully'})
    } catch (err) {
        return next(new httpError('Something went wrong, please try again'), 500)
    }
}
