const { verify, hash, argon2id } = require("argon2");
const { generateToken } = require("../services/jwt");
const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// This function is used to get all informations need to delete a user or a recipe
const selectForDelete = (req, res) => {
  models.user
    .findForDelete(req.params.id)
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
              role_id: user.role_id,
            });
            return res
              .cookie("user_auth", token, { httpOnly: true, secure: false })
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

module.exports = {
  browse,
  read,
  destroy,
  selectForDelete,
  add,
  log,
  // edit,
  // editPassword,
};
