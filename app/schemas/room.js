const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RoomSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  desc: {
    type: String,
  },
  declare: {
    type: String,
  },
  owner: {
    type: ObjectId,
    ref: "User",
  },
  members: [{
    type: ObjectId,
    ref: "User",
  }],
  meta: {
    createAt: {
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
    this.meta.createAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  next();
});

module.exports = RoomSchema;
