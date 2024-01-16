const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  name: String,
  approvalStatus: String,
  detailsSubmitted: {
   type: Boolean,
   default: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
