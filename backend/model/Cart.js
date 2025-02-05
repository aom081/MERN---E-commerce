const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  ProductId: { type: Schema.Types.ObjectId, ref: "Product" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: String, required: true },
});

const ProductModel = module("Product", ProductSchema);
module.exports = ProductModel;
