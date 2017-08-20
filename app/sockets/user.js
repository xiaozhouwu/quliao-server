function userSocket(socket) {
  socket.on("message", (msg) => {
    console.log("msg");
  });
}

module.exports = userSocket;