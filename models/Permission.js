const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  permissionName: {
    type: String,
    required: true,
  },
  permissionType: {
    type: String,
    default: "",
  },
  permissionRoute: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("permission", PermissionSchema);
