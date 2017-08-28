const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/jwt");

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, SECRET);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = verifyToken;
