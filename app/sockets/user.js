function userSocket(socket) {
  socket.on("login", (msg, cb) => {
    console.log(msg);
    cb("登录");
  });
}

module.exports = userSocket;
