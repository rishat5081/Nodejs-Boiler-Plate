const mongoose = require("mongoose");

const UserAvatarSchema = new mongoose.Schema({
  avatarId: {
    type: Schema.Types.ObjectId,
    ref: "avatar",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("useravatar", UserAvatarSchema);
