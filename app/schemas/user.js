const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  joinedRooms: [{
    type: ObjectId,
    ref: "Room",
  }],
  avatar: {
    type: String,
    default: "",
  },
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

UserSchema.pre("save", next => {
  if (this.isNew) {
    this.meta.cteateAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  next();
});

module.exports = UserSchema;
