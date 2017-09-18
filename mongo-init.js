const bcrypt = require("bcryptjs");
const Room = require("./app/models/room");
const User = require("./app/models/user");
const { userAvatars } = require("./config/app");

async function mongoInit() {
  const publicRoom = await Room.findOne({ name: "公共聊天室" });
  if (!publicRoom) {
    const roomObj = {
      name: "公共聊天室",
      avatar: userAvatars[0],
      members: [],
    };
    const _publicRoom = new Room(roomObj);
    const newPublicRoom = await _publicRoom.save();
    const { _id: roomId } = newPublicRoom;
    const hashPwd = bcrypt.hashSync("123456", 10);
    const userObj = {
      name: "吴小粥",
      email: "wubaixing1379@163.com",
      password: hashPwd,
      joinedRooms: [roomId],
    };
    const _user = new User(userObj);
    const { _id: userId } = await _user.save();
    newPublicRoom.owner = userId;
    newPublicRoom.members.push(userId);
    await newPublicRoom.save();
  }
}

module.exports = mongoInit;
