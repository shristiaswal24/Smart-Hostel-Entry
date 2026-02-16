const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  roomNo: {
    type: String,
    required: true
  },
  entryTime: {
    type: Date
  },
  exitTime: {
    type: Date
  }
});

module.exports = mongoose.model("Student", studentSchema);