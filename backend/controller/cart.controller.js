const CartModel = require("../model/Cart");

exports.createCart = async (req, res) => {
  const { productId, name, price, image, quantity, email } = res.body;
  if (!productId || !name || !price || !image || !quantity || !email) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const existingItem = await CartModel.findOne({productId, email});
    if(existingItem){
        existingItem.quantity += quantity
        const data = await existingItem.save();
        return res.json(data);
        }
    // add item first time
    const cart = new CartModel({
      productId,
      name,
      price,
      image,
      quantity,
      email,
    });
    const savedCart = await cart.save();
    res.send(savedCart);
  } catch (error) {
    res.status(500).send({
      message: "Error creating cart",
    });
  }
};
