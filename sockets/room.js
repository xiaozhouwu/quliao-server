function roomSocket(socket) {
  socket.on("message", (msg) => {
    console.log("msg");
  });
}

module.exports = roomSocket;