const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  contactNumber: {
    type: Number,
  },
  isNewProfile: {
    type: Boolean,
    default: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_role",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
