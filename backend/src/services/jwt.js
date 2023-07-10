const jwt = require("jsonwebtoken");

// Create a function to generate a token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// Create a function to decode a token
function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateToken,
  decodeToken,
};
