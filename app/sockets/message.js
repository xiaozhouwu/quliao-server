const Message = require("../models/message");

function messageSocket(socket, io) {
  socket.on("new message", async (msg, cb) => {
    try {
      if (!msg.error) {
        const {
          roomId,
          content,
          decoded: {  _id: userId },
        } = msg;
        const _message = new Message({
          from: userId,
          room: roomId,
          content,
        });
        const { _id: newId } = await _message.save();
        const newMessage = await Message.findById(newId).populate({
          path: "from",
          select: {
            password: 0,
          },
        });
        io.to(roomId).emit("new message", newMessage);
        cb({
          status: 0,
          msg: "发送成功",
        });
      } else {
        cb({
          status: 2,
          msg: "发送失败",
          error: "token错误",
        });
      }
    } catch (error) {
      cb({
        status: 3,
        msg: "发送失败",
        error: "服务器遇到点问题",
      });
    }
  });

  socket.on("get missing messages", async (msg, cb) => {
    try {
      if (!msg.error) {
        const {
          data: {
            roomId,
            disconnectTime,
          },
        } = msg;
        const messages = await Message.find({ room: roomId, createAt: { $gt: disconnectTime } }).populate({
          path: "from",
          select: {
            password: 0,
          },
        });
        cb({
          status: 0,
          data: messages,
        });
      } else {
        cb({
          status: 2,
          msg: "发送失败",
          error: "token错误",
        });
      }
    } catch (error) {
      cb({
        status: 3,
        msg: "发送失败",
        error: "服务器遇到点问题！",
      });
    }
  });

  socket.on("get history messages", async (msg, cb) => {
    try {
      if (!msg.error) {
        const {
          data: {
            roomId,
            time,
            num,
          },
        } = msg;
        const messages = await Message.find({ room: roomId, createAt: { $lt: time } }).populate({
          path: "from",
          select: {
            password: 0,
          },
        }).sort({ createAt: -1 }).limit(num);
        cb({
          status: 0,
          data: messages.reverse(),
        });
      } else {
        cb({
          status: 2,
          msg: "发送失败",
          error: "token错误",
        });
      }
    } catch (error) {
      cb({
        status: 3,
        msg: "发送失败",
        error: "服务器遇到点问题！",
      });
    }
  });
}

module.exports = messageSocket;
