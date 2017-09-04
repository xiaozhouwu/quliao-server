const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/jwt");
const User = require("../models/user");
const Room = require("../models/room");

exports.login = async (ctx, next) => {
  const {
    loginEmail,
    loginPwd,
  } = ctx.request.body;
  const user = await User.findOne({ email: loginEmail });
  if (!user) {
    ctx.body = {
      status: 1,
      msg: "该用户不存在",
    };
  } else {
    const {
      _id,
      name,
      email,
      password,
    } = user;
    const result = bcrypt.compareSync(loginPwd, password);
    if (result) {
      const payload = {
        _id,
        name,
        email,
      };
      const token = jwt.sign(payload, SECRET, { expiresIn: 2 * 24 * 60 * 60 });
      ctx.body = {
        status: 0,
        msg: "登录成功",
        token,
      };
    } else {
      ctx.body = {
        status: 1,
        msg: "密码错误，登录失败",
      };
    }
  }
};

exports.signup = async (ctx, next) => {
  const {
    signupName,
    signupEmail,
    signupPwd,
  } = ctx.request.body;
  const userByName = await User.findOne({ name: signupName });
  const userByEmail = await User.findOne({ email: signupEmail });
  if (userByName) {
    ctx.body = {
      status: 1,
      msg: "用户名已存在",
    };
  } else if (userByEmail) {
    ctx.body = {
      status: 1,
      msg: "邮箱已存在",
    };
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
    ctx.body = {
      status: 0,
      msg: "注册成功",
    };
  }
};
