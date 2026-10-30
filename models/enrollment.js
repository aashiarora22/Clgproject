
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: String,
  course: String
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
