const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authJwt = require("../middleware/auth");

//http//localhost:5000/api/v1/user/sign
router.post("/sign", userController.sign);
router.post("/",authJwt.verifyToken, authJwt.isAdmin, userController.addUser);
router.get("/", userController.getAllUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.makeUser);
router.patch("/:id", userController.makeAdmin);
module.exports = router;
