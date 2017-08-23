const User = require("../models/user");
const Room = require("../models/room");

function userSocket(socket) {
  socket.on("signup", async (msg, cb) => {
    const {
      signupName,
      signupEmail,
      signupPwd,
    } = msg;
    const userByName = await User.findOne({ name: signupName });
    const userByEmail = await User.findOne({ email: signupEmail });
    if (userByName) {
      cb({
        status: 1,
        msg: "用户名已存在",
      });
    } else if (userByEmail) {
      cb({
        status: 1,
        msg: "邮箱已存在",
      });
    } else {
      const publicRoom = await Room.findOne({ name: "公共聊天室" });
      const {
        _id,
      } = publicRoom;
      const _user = new User({
        name: signupName,
        email: signupEmail,
        joinedRooms: [_id],
      });
      const user = await _user.save();
      cb({
        status: 0,
        msg: "注册成功",
      });
    }
  });

  socket.on("login", async msg => {
    const {
      loginEmail,
      loginPwd,
    } = msg;
  });
}

module.exports = userSocket;