const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  from: {
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
    type: Number,
    default: Date.now(),
  },
});

MessageSchema.pre("save", function (next) {
  this.cteateAt = Date.now();
  next();
});

module.exports = MessageSchema;
