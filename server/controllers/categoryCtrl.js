const Category = require('../models/categoryModal')
const httpError = require('../middlewares/http-error')

exports.getCategories = async (req, res, next) => {
    try {
     const categories = await Category.find()
     res.json({categories})
    } catch (err) {
        console.log(err.message);
      return next(new httpError('Something went wrong, please try again'))
    }
}

exports.createCategory = async (req, res, next) => {
  try {
    //if user have role = 1 => admin
    //only admin can create, delete and update category
    const {name} = req.body;
    const category = await Category.findOne({name})

    if(category) return next(new httpError('This category already exists', 400))

    const newCategory = new Category({name})
    await newCategory.save()
    res.json({status: "success", msg: "Category created"})

  } catch (err) {
    next(new httpError('something went wrong, please try again'))
  }
}

exports.getCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    const category = await Category.findOne({_id:id})

    if(!category) return next(new httpError('This category not exists', 400))

    res.json({status: "success", category})

  } catch (err) {
    next(new httpError('something went wrong, please try again'))
  }
}

exports.updateCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const category = await Category.findByIdAndUpdate({_id:id}, {name})

    if(!category) return next(new httpError('This category not exists', 400))

    res.json({status: "success", msg: "Category has been updated successfully", category})

  } catch (err) {
    next(new httpError('something went wrong, please try again'))
  }
}

exports.deleteCategory = async (req, res, next) => {
  const {id} = req.params;
  try {
    const category = await Category.findByIdAndDelete({_id:id})

    if(!category) return next(new httpError('This category not exists', 400))
    
    res.json({status: "success", msg: "Category hsa been successfully deleted"})

  } catch (err) {
    next(new httpError('something went wrong, please try again'))
  }
}