const mongoose = require("mongoose");

const connectDB = () => {
  mongoose

    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(`Error connecting to Database ${err}`);
      return;
    });
};

module.exports = connectDB;
