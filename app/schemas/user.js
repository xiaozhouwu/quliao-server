const mongoose = require("mongoose");
const {
  DEFAULT_USER_AVATAR,
} = require("../../config/app");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  joinedRooms: [{
    type: ObjectId,
    ref: "Room",
  }],
  avatar: {
    type: String,
    default: DEFAULT_USER_AVATAR,
  },
  city: {
    type: String,
  },
  motto: {
    type: String,
  },
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

UserSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.createAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  next();
});

module.exports = UserSchema;
