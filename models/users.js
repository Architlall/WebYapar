const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  image: String,
  name: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
