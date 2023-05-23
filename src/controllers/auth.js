const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).exec();

  if (!user) {
    return res.status(401).json({ message: "Invalid email or Password" });
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    {
      email: user.email,
      password: user.password,
      userType: user.userType,
    },
    process.env.JWT_SECRETE,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    accessToken: token,
  });
});

module.exports = login;
