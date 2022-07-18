const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user_role", UserRoleSchema);
