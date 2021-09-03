const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
