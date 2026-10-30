
const mongoose = require("mongoose");

async function connectToDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected");
}

module.exports = connectToDB;
