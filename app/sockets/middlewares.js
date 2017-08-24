const jwt = require("jsonwebtoken");
const { secret } = require("../../config/jwt");

export default function verifyToken(msg) {
  const {
    token,
  } = msg;
  return new Promise((resolve, reject) => {
    try {
      msg.user = jwt.verify(token, secret);
      resolve(msg);
    } catch (error) {
      reject(error);
    }
  });
}
