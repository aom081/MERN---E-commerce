const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const ProductModel = module( "Product", ProductSchema);
module.exports = ProductModel;
