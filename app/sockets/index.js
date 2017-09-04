const messageSocket = require("./message");
const roomSocket = require("./room");
const userSocket = require("./user");
const { verifyToken } = require("./middleware");

function listenSocket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.use(verifyToken);
    messageSocket(socket, io);
    roomSocket(socket, io);
    userSocket(socket, io);
  });
}

module.exports = listenSocket;
