const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb is connected successfully");
  } catch (err) {
    console.log("Error while connecting to mongodb: ", err);
  }
};

module.exports = connectToDB;
