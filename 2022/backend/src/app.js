require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const login = require("./routes/auth");
const user = require("./routes/user");
const modules = require("./routes/module");
const timetable = require("./routes/timetable");

const app = express();

app.use(express.json());
app.use(cors());

// Health Checker
app.get("/", (req, res) => res.send("API is running"));

// routes
app.use("/api/login", login);
app.use("/api/user", user);
app.use("/api/module", modules);
app.use("/api/timetable", timetable);

// database connection
connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
