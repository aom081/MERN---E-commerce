const CartModel = require("../models/Cart");

exports.createCart = async (req, res) => {
  /**
    #swagger.tags = ['Cart Item']
    #swagger.summary = "Create a cart item"
    #swagger.description = 'Endpoint to create a cart item'
     */
  const { productId, name, price, image, quantity, email } = req.body;
  if (!productId || !name || !price || !image || !quantity || !email) {
    res.status(400).json({ message: "Product information is missing!" });
    return;
  }
  try {
    //Existing item in our cart
    const existingItem = await CartModel.findOne({ productId, email });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.json(data);
    }
    //add item to cart for the first time
    const cart = new CartModel({
      productId,
      name,
      price,
      image,
      quantity,
      email,
    });
    const data = await cart.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while adding new cart item",
    });
  }
};

exports.getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    // console.log(cartItems);

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while retrieving cart items",
    });
  }
};

exports.getCartItemsByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400).json({ message: "Email is missing!" });
    return;
  }
  try {
    const cartItems = await CartModel.find({ email });
    if (!cartItems) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while retrieving cart items by email",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItems = await CartModel.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!cartItems) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while updating cart items by email",
    });
  }
};

exports.deleteCartItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await CartModel.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while deleting cart items by id",
    });
  }
};

exports.clearAllItem = async (req, res) => {
  const { email } = req.params;
  try {
    const cart = await CartModel.deleteMany({ email });
    if (cart.deletedCount > 0) {
      return res.json({ message: "Cart cleared successfully" });
    }
    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart is Empty" });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while clearing shopping cart",
    });
  }
};
