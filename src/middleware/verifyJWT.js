const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Baerer token is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRETE, (err, decode) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = decode;
    next();
  });
};

module.exports = verifyJWT;
