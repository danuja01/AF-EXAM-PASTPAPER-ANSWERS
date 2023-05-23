const Timetable = require("../models/Timetable");

const createTimeslot = async (req, res) => {
  try {
    const newTimeslot = await Timetable.create(req.body);

    return req.status(201).json({
      data: newTimeslot,
      message: "Timeslot Created!",
    });
  } catch (err) {
    return req.status(500).json({
      message: err.message,
    });
  }
};

const getTimetable = async (req, res) => {
  const data = await Timetable.find();

  if (!data) {
    return res.status(404).json({ message: "No any data found" });
  }

  return res.status(200).json({
    data,
    message: "Retrived timetable successfully.",
  });
};

const getTimeslotsByLecturer = async (req, res) => {
  const { id } = req.params;

  const data = await Timetable.find({ lecturer: id }).populate("module").lean();

  if (!data) {
    return res.status(404).json({ message: "No any data found" });
  }

  return res.status(200).json({
    data,
    message: "Retrived timeslots successfully.",
  });
};

const getTimeslotsBySemester = async (req, res) => {
  const { semester } = req.body;

  const data = await Timetable.find({ semester });

  if (!data) {
    return res.status(404).json({ message: "No any data found" });
  }

  return res.status(404).json({
    data,
    message: "Retrived timeslots successfully.",
  });
};

module.exports = {
  createTimeslot,
  getTimetable,
  getTimeslotsByLecturer,
  getTimeslotsBySemester,
};
