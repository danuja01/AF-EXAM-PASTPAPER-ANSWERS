const Module = require("../models/Module");

const createModule = async (req, res) => {
  try {
    const newModule = await Module.create(req.body);

    res.status(201).json({
      data: newModule,
      message: "Module Created Successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllModules = async (req, res) => {
  const data = await Module.find()
    .populate("lecturerIds", "userName email")
    .lean();

  return res.status(200).json({
    data,
    message: "Modules Retrived Successfully",
  });
};

const getAModule = async (req, res) => {
  const { id } = req.params;

  const module = await Module.findById(id)
    .populate("lecturerIds", "userName email")
    .lean();

  if (!module) {
    return res.status(404).json({
      message: "Module not found",
    });
  }

  return res.status(200).json({
    data: module,
    message: "Module found Succesfully",
  });
};

const deleteModule = async (req, res) => {
  const { id } = req.params;

  const module = await Module.findOneAndDelete(id);

  if (!module) {
    return res.status(404).json({
      message: "module not found",
    });
  }

  res.status(200).json({
    data: module,
    message: "Module deleted Successfully",
  });
};

module.exports = {
  createModule,
  getAllModules,
  getAModule,
  deleteModule,
};
