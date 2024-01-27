const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  // we get the token from the cookie headers
  const { cookie } = req.headers;
  let token;

  if (cookie) {
    // eslint-disable-next-line prefer-destructuring
    token = cookie
      .split("; ")
      .filter((elem) => elem.includes("user_auth"))
      .toString()
      .split("=")[1];
  }

  // we check if token exist, decode it and if it works user is verified
  if (token !== undefined) {
    jwt.verify(token, process.env.JWT_SECRET, (err, currentUser) => {
      if (err) {
        res
          .status(403)
          .json({ error: "Your session has expired, please reconnect." });
      } else {
        req.user = currentUser;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "You are not connected." });
  }
};

const checkRole = (req, res, next) => {
  const roleId = req.body.role_id;
  const headersRoleId = parseInt(req.headers.authorization, 10);

  if (roleId === 3 || headersRoleId === 3) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "You don't have authorisation for this action!" });
  }
};

module.exports = { checkAuth, checkRole };
