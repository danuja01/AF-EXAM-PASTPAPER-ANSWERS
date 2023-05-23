const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ email: user.email });

  if (existingUser) {
    return res.status(409).json({
      message: "email already exists, please try different user.",
    });
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  try {
    const newUser = await User.create(user);

    res.status(201).json({
      data: newUser,
      message: "User Created Successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  return res.status(200).json({
    data: users,
    message: "Users retrived successfully.",
  });
};

const getAUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  res.status(200).json({
    data: user,
    messahe: "User Found Successfully",
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, email, useType } = req.body;

  try {
    const data = await User.findByIdAndUpdate(
      id,
      { userName, email, useType },
      { new: true }
    );

    return res.status(200).json({
      data,
      message: "User updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const data = await User.findByIdAndDelete(id);

  return res.status(200).json({
    data,
    message: "User deleted Successfully",
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
};
