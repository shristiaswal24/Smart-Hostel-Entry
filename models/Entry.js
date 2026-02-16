const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  roomNo: String,
  entryTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Entry", entrySchema);