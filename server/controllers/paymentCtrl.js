const Payments = require("../models/paymentModel");
const Products = require("../models/productModel");
const { getUserById } = require("../queries/users");

exports.getPayment = async (req, res, next) => {
  try {
    const payments = await Payments.find();
    res.json(payments);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.createPayment = async (req, res, next) => {
  console.log(req.body, "-------------------");
  try {
    const user = await getUserById(req.user.userId).select("name email");
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const { cart, paymentID, address } = req.body;
    const { _id, name, email } = user;

    const newPayment = new Payments({
      user_id: _id,
      name,
      email,
      cart,
      paymentID,
      address,
    });

    cart.forEach((item) => {
      return sold(item._id, item.quantity, item.sold);
    });

    await newPayment.save();

    res.json(newPayment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const sold = async (id, quantity, oldSold) => {
  try {
    await Products.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold });
  } catch (err) {
    console.error(err.message);
  }
};
