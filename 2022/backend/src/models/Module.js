const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  lecturerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  academicYear: {
    type: Number,
    required: true,
  },
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
