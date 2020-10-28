const category = require('../models/categoryModal')
const httpError = require('../middlewares/http-error')

exports.getCategories = async (req, res, next) => {
    try {
     const categories = await category.find()
     res.json(categories)
    } catch (err) {
        console.log(err.message);
      return next(new httpError('Something went wrong, please try again'))
    }
}