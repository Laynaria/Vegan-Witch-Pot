const models = require("../models");

const browse = (req, res) => {
  models.recipe
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const recipe = req.body;

  // TODO validations (length, format...)

  models.recipe
    .insert(recipe)
    .then(([result]) => {
      res.location(`/recipes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  add,
};
