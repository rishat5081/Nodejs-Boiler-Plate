const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  avatarName: {
    type: String,
    required: true,
  },
  avatarIcon: {
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

module.exports = mongoose.model("avatar", avatarSchema);
