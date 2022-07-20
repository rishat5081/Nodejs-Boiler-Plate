const mongoose = require("mongoose");
let Schema = mongoose.Schema;
require("./Role"); // adding this required because it need to be linked with the user model https://stackoverflow.com/a/27497785/10967697
const userSchema = new Schema({
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
  addressSecondary: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  geoLocation: {
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    default: "",
    lowercase: true,
    enum: ["male, female", "others"],
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  contactNumber: {
    type: Number,
    default: 0.0,
  },
  isNewProfile: {
    type: Boolean,
    default: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "User_Role",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = user;
