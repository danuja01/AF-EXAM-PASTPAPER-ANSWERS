const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  timeslot: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    required: true,
  },
  hall: {
    type: String,
    required: true,
  },
});

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;
