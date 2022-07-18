const mongoose = require("mongoose");

const UserSportSchema = new mongoose.Schema({
  sportId: {
    type: Schema.Types.ObjectId,
    ref: "sport",
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

module.exports = mongoose.model("usersport", UserSportSchema);
