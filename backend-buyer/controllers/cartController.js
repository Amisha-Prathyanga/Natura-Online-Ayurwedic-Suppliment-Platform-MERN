const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

//get all cart details
const getcartDetails = async (req, res) => {
  const cartDetails = await Cart.find({}).sort({ createdAt: -1 });

  res.status(200).json(cartDetails);
};

//get a single cart Detail
const getcartDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such cart Detail" });
  }

  const cartDetail = await Cart.findById(id);

  if (!cartDetail) {
    return res.status(404).json({ error: "No such cart Detail" });
  }

  res.status(200).json(cartDetail);
};

//create a new cart
const createcartDetail = async (req, res) => {
  const { product, user, quantity } = req.body;

  let emptyFields = [];

  if (!product) {
    emptyFields.push("product");
  }
  if (!user) {
    emptyFields.push("user");
  }
  if (!quantity) {
    emptyFields.push("quantity");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const cartDetail = await Cart.create({ product, user, quantity });
    res.status(200).json(cartDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deletecartDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such cart Detail" });
  }

  const cartDetail = await Cart.findOneAndDelete({ _id: id });

  if (!cartDetail) {
    return res.status(404).json({ error: "No such cart Detail" });
  }

  res.status(200).json(cartDetail);
};

//update a workout
const updatecartDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such cart Detail" });
  }

  const cartDetail = await Cart.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!cartDetail) {
    return res.status(404).json({ error: "No such cart Detail" });
  }

  res.status(200).json(cartDetail);
};

module.exports = {
  getcartDetails,
  getcartDetail,
  createcartDetail,
  deletecartDetail,
  updatecartDetail,
};
