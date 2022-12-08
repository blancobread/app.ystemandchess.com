const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connecting.... from middleware node");
    console.log("MongoDB Connected...from middleware node");
    console.log("succefully connected..from middleware node");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
