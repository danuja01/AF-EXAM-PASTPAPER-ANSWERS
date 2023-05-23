const express = require("express");
const {
  createUser,
  getAllUsers,
  getAUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// middleware
const validateUser = require("../middleware/validateUser");
const verifyJWT = require("../middleware/verifyJWT");
const authorizer = require("../middleware/authorizer");

const router = express.Router();

router.post("/", validateUser, createUser);
router.get("/", verifyJWT, getAllUsers);
router.get("/:id", verifyJWT, getAUser);
router.patch("/:id", verifyJWT, authorizer(["admin"]), updateUser);
router.delete("/:id", verifyJWT, authorizer(["admin"]), deleteUser);

module.exports = router;
