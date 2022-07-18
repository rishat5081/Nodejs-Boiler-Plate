const mongoose = require("mongoose");

const RolePermissionSchema = new mongoose.Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "user_role",
    required: true,
  },
  permissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "permission",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("RolePermission", RolePermissionSchema);
