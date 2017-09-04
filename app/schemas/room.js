const mongoose = require("mongoose");
const {
  DEFAULT_GROUP_AVATAR,
} = require("../../config/app");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RoomSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  owner: {
    type: ObjectId,
    ref: "User",
  },
  avatar: {
    type: String,
    default: DEFAULT_GROUP_AVATAR,
  },
  members: [{
    type: ObjectId,
    ref: "User",
  }],
  meta: {
    cteateAt: {
      type: Number,
      default: Date.now(),
    },
    updateAt: {
      type: Number,
      default: Date.now(),
    },
  },
});

RoomSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.cteateAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  next();
});

module.exports = RoomSchema;
