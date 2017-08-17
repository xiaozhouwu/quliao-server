const mongoose = require("mongoose");
const RoomSchema = require("../schemas/room");

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
