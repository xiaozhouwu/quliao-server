const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/jwt");

function verifyToken(packet, next) {
  try {
    const {
      token,
    } = packet[1];
    const decoded = jwt.verify(token, SECRET);
    packet[1].decoded = decoded;
    packet[1].error = null;
    return next();
  } catch (error) {
    packet[1].error = error;
    return next();
  }
}

module.exports = {
  verifyToken,
};
