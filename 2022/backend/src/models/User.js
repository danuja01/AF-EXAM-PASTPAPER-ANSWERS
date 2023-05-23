const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "lecturer", "student"],
    default: "student",
  },
  other: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
