const express = require("express");
const {
  createModule,
  getAllModules,
  getAModule,
  deleteModule,
} = require("../controllers/module");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/", createModule);
router.get("/", verifyJWT, getAllModules);
router.get("/:id", verifyJWT, getAModule);
router.delete("/:id", verifyJWT, deleteModule);

module.exports = router;
