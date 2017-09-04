const User = require("../models/user");

function userSocket(socket) {
  socket.on("myInfo", async (msg, cb) => {
    if (!msg.error) {
      const {
        decoded: {
          _id: userId,
        },
      } = msg;
      const user = await User.findById(userId, { password: 0 }).populate({
        path: "joinedRooms",
        select: {
          _id: 1,
          name: 1,
          avatar: 1,
        },
      });
      const {
        joinedRooms,
      } = user;
      joinedRooms.forEach(({ _id }) => socket.join(_id));
      cb(user);
    }
  });
}

module.exports = userSocket;
