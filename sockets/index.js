const messageSocket = require("./message");
const roomSocket = require("./room");
const userSocket = require("./user");

function listenSocket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");
    messageSocket(socket);
    roomSocket(socket);
    userSocket(socket);
  });
}

module.exports = listenSocket;