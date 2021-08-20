const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

// Connecting to the database
exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed!");
      console.error(error);
      //exiting...
      process.exit(1);
    });
}; 