const { verify, hash, argon2id } = require("argon2");
const { generateToken } = require("../services/jwt");
const models = require("../models");

// function use to verify is email already exist
const checkEmail = (req, res) => {
  const { email } = req.params;

  models.user
    .findIfEmailExist(email)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// function use to verify is username already exist
const checkUsername = (req, res) => {
  const { username } = req.params;

  models.user
    .findIfUsernameExist(username)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// This function creates a new user with a hashed password
const add = (req, res) => {
  // First we extract the password from the body
  const { password } = req.body;

  // We create our hasing options
  const hashingOptions = {
    type: argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

  hash(password, hashingOptions).then((hashedPassword) => {
    // We extract all the information from body, put it in a user variable
    // and replace password with hashed password
    const user = { ...req.body, hashedPassword };

    models.user
      .insert(user)
      .then(([rows]) => {
        if (rows.affectedRows === 1) {
          return res.status(201).json({ success: "User saved!" });
        }
        return res.status(403).json({ error: "An error has occured!" });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

const log = (req, res) => {
  const { email, password } = req.body;

  models.user
    .findByEmail(email)
    .then(([[user]]) => {
      if (!user) {
        return res.status(403).json({ error: "User not found" });
      }
      verify(user.password, password)
        .then((match) => {
          if (match) {
            const token = generateToken({
              id: user.id,
            });
            return res
              .cookie("user_auth", token, {
                httpOnly: true,
                secure: false,
                expires: new Date(Date.now() + 1000 * 60 * 60),
              })
              .status(200)
              .json({ token, sucess: "User logged" });
          }
          return res.status(403).json({ error: "password incorrect" });
        })
        .catch((error) => {
          console.error(error);
        });
      return false;
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const logout = (req, res) => {
  // clear authentification token from cookie
  return res
    .status(200)
    .clearCookie("user_auth")
    .json({ success: "User disconnected" });
  // the json isn't sent to postman, not sure why
};

module.exports = {
  checkUsername,
  checkEmail,
  add,
  log,
  logout,
};
