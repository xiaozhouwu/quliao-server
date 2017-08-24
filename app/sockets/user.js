const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwt");
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
      const hashSignupPwd = bcrypt.hashSync(signupPwd, 10);
      const publicRoom = await Room.findOne({ name: "公共聊天室" });
      const {
        _id,
      } = publicRoom;
      const _user = new User({
        name: signupName,
        email: signupEmail,
        password: hashSignupPwd,
        joinedRooms: [_id],
      });
      const user = await _user.save();
      cb({
        status: 0,
        msg: "注册成功",
      });
    }
  });

  socket.on("login", async (msg, cb) => {
    const {
      loginEmail,
      loginPwd,
    } = msg;
    const user = await User.findOne({ email: loginEmail });
    if (!user) {
      cb({
        status: 1,
        msg: "该用户不存在",
      });
    } else {
      const {
        name,
        email,
        password,
      } = user;
      const result = bcrypt.compareSync(loginPwd, password);
      if (result) {
        const payload = {
          name,
          email,
        };
        const token = jwt.sign(payload, secret, { expiresIn: 2 * 24 * 60 * 60 });
        cb({
          status: 0,
          msg: "登录成功",
          token,
        });
      } else {
        cb({
          status: 1,
          msg: "登录失败",
        });
      }
    }
  });
}

module.exports = userSocket;