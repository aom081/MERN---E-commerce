const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, min: 4 },
  password: { type: String, required: true },
});

const UserModel = module("User", UserSchema);
module.exports = UserModel;
