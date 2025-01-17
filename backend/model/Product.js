const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const ProductModel = module( "Product", ProductSchema);
module.exports = ProductModel;
