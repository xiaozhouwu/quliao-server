const User = require("../models/user");

function userSocket(socket) {
  socket.on("signup", async (msg, cb) => {
    const {
      signupName,
      signupEmail,
      signupPwd,
    } = msg;
    const userByName = await User.findOne({ name: signupName });
    const userByEmail = await User.findOne({ email: signupEmail });
    cb("haha");
  });

  socket.on("login", async msg => {
    const {
      loginEmail,
      loginPwd,
    } = msg;
  });
}

module.exports = userSocket;