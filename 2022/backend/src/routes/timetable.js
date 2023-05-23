const express = require("express");
const {
  createTimeslot,
  getTimetable,
  getTimeslotsByLecturer,
  getTimeslotsBySemester,
} = require("../controllers/timetable");

//middleware
const verifyJWT = require("../middleware/verifyJWT");
const authorizer = require("../middleware/authorizer");

const router = express.Router();

router.post("/", verifyJWT, createTimeslot);
router.get("/", verifyJWT, authorizer(["admin"]), getTimetable);
router.get(
  "/lecturer/:id",
  verifyJWT,
  authorizer(["admin", "lecturer"]),
  getTimeslotsByLecturer
);
router.get("/semester/:semester", verifyJWT, getTimeslotsBySemester);

module.exports = router;
