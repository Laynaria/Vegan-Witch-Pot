const models = require("../models");

const readByRecipe = (req, res) => {
  models.recipe_ingredient_quantity
    .findByRecipe(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readByRecipeForEdit = (req, res) => {
  models.recipe_ingredient_quantity
    .findByRecipeForEdit(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { arr } = req.body;

  models.recipe_ingredient_quantity
    .deleteByRecipeId(arr)
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

module.exports = {
  // browse,
  // add,
  // read,
  // edit,
  readByRecipe,
  readByRecipeForEdit,
  destroy,
};
