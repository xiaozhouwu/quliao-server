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
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = RoomSchema;
