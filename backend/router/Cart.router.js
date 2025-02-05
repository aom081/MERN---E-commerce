const express = require("express");
const router = express.Router();
const productController = require("../controller/cart.controller");

router.post("/", cartController.createCart);


module.exports = router;