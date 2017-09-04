const Message = require("../models/message");

function messageSocket(socket, io) {
  socket.on("message", async (msg, cb) => {
    const {
      roomId,
      content,
      decoded: {
        _id: userId,
      },
    } = msg;
    const _message = new Message({
      from: userId,
      room: roomId,
      content,
    });
    const {
      _id: newId,
    } = await _message.save();
    const newMessage = await Message.findById(newId).populate({
      path: "from",
      select: {
        password: 0,
      },
    });
    io.to(roomId).emit("newMessage", newMessage);
    cb({
      status: 0,
      msg: "发送成功",
    });
  });
}

module.exports = messageSocket;
