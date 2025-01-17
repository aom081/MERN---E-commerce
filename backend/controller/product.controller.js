const ProductModel = require("../model/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createProduct = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  //File upload
  if (!req.file) {
    return res.status(400).json({ message: "No Image uploaded" });
  }
  const { path } = req.file.firebaseUrl;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const ProductDoc = await ProductModel.create({
      title,
      summary,
      content,
      cover: req.file.firebaseUrl,
      author,
    });
    res.json(ProductDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create Product" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Product = await ProductModel.find()
    //SELECT * FROM Product WHERE Product.author =USER._id
    if (!Product) {
      return res.status(404).json({ message: "No Product found" });
    }
    res.json(Product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.findById(id).populate("author", [
      "username",
    ]);
    if (!ProductDoc) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  try {
    const ProductDoc = await ProductModel.findById(id);
    if (authorId !== ProductDoc.author.toString()) {
      res.status(403).send({ message: "You can not delete Product" });
      return;
    }
    await ProductDoc.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "delete Product error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Product not provided" });
  const authorId = req.userId;
  try {
    const ProductDoc = await ProductModel.findById(id);
    if (authorId !== ProductDoc.author.toString()) {
      res.status(403).send({ message: "You can not update Product" });
      return;
    }

    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    ProductDoc.title = title;
    ProductDoc.summary = summary;
    ProductDoc.content = content;
    if (req.file) {
      const { path } = req.file;
      ProductDoc.cover = path;
    }
    await ProductDoc.save();
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "update Product error" });
  }
};

exports.getProductByAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.find({ author: id }).populate("author", [
      "username",
    ]);
    if (!ProductDoc) {
      return res.status(404).send({ message: "author not found" });
    }
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};
