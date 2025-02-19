const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const secret = process.env.SECRET;

exports.sign = async (req, res) => {
  const { email } = req.body;
  //1.Check email is existing in DB?
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email is not found" });
  }
  //2.Sign JWT token
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.status(200).json(userInfo);
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(200).json({ message: "Email is already existed" });
    }
    const user = new UserModel({ email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while adding a new user",
    });
  }
};
