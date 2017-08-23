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
    default: "http://note.youdao.com/yws/public/resource/14483e8d68e2d48dc17f6bcd78c6b1c5/xmlnote/23FF68DBF0374E778E8A33DEEF2F0B9F/19694",
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

UserSchema.pre("save", function (next) {
  if (this.isNew) {
    this.meta.cteateAt = Date.now();
  }
  this.meta.updateAt = Date.now();
  next();
});

module.exports = UserSchema;
