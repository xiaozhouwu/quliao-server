const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RoomSchema = new Schema({
  name: {
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
    cteateAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
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
