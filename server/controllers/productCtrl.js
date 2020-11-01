const Products = require('../models/productModel')
const httpError = require('../middlewares/http-error')


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

     pagination(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
     }
}


exports.getProducts = async (req, res, next) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering().sorting().pagination()
      
      const products = await features.query

      if (!products) return next(new httpError('No products found'), 400)

      res.status(200).json({status: "success", results: products.length, products})
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

exports.deleteProduct = async (req, res, next) => {
    const {id} = req.params;
    try {
     const product = await Products.findOne({_id: id})

     if (!product) return next(new httpError('product not found'), 400)

      await Products.findByIdAndDelete({_id: id})


      res.status(200).json({status: "success", msg: "Product deleted successfully"})
    } catch (err) {
        return next(new httpError('Something went wrong, please try again'), 500)
    }
}