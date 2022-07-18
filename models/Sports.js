const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  sportName: {
    type: String,
    required: true,
  },
  sportIcon: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("sport", sportSchema);
