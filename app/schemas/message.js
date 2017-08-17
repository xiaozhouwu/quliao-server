const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  room: {
    type: ObjectId,
    ref: "Room",
  },
  content: {
    type: String,
  },
  cteateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = MessageSchema;
