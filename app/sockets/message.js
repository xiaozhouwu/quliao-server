function messageSocket(socket) {
  socket.on("message", (msg) => {
    console.log("msg");
  });
}

module.exports = messageSocket;
