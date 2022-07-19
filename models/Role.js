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

const userRole =
  mongoose.models.User_Role || mongoose.model("User_Role", UserRoleSchema);
module.exports = userRole;
