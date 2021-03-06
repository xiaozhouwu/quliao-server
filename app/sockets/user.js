const User = require("../models/user");

function userSocket(socket, io) {
  socket.on("myInfo", async (msg, cb) => {
    try {
      if (!msg.error) {
        const {
          decoded: {
            _id: userId,
          },
        } = msg;
        const user = await User.findById(userId, { password: 0 }).populate({
          path: "joinedRooms",
          populate: [
            {
              path: "owner",
              select: {
                password: 0,
              },
            },
            {
              path: "members",
              select: {
                password: 0,
              },
            },
          ],
        });
        const {
          joinedRooms,
        } = user;
        joinedRooms.forEach(({ _id }) => socket.join(_id));
        cb({
          status: 0,
          data: user,
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

  socket.on("change my info", async (msg, cb) => {
    try {
      if (!msg.error) {
        const {
          decoded: {
            _id: userId,
          },
          data: userObj,
        } = msg;
        const user = await User.findById(userId);
        Object.assign(user, userObj);
        const {
          _id,
          name,
          city,
          meta,
          avatar,
          motto,
        } = await user.save();
        cb({
          status: 0,
          data: {
            _id,
            name,
            city,
            meta,
            avatar,
            motto,
          },
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

module.exports = userSocket;
