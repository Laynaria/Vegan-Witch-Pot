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

const readByLineAndRecipeId = (req, res) => {
  const ingredient = { line: req.params.line, recipe_id: req.params.recipeId };

  models.recipe_ingredient_quantity
    .findByLineAndRecipeId(ingredient)
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

const add = (req, res) => {
  const ingredient = req.body;

  // TODO validations (length, format...)

  models.recipe_ingredient_quantity
    .insert(ingredient)
    .then(([result]) => {
      res.location(`/items/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const ingredient = req.body;

  // TODO validations (length, format...)

  ingredient.id = parseInt(req.params.id, 10);
  ingredient.ingredient_id = parseInt(ingredient.ingredient_id, 10);
  ingredient.recipe_id = parseInt(ingredient.recipe_id, 10);
  ingredient.quantity_id = parseInt(ingredient.quantity_id, 10);

  models.recipe_ingredient_quantity
    .update(ingredient)
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

const destroyByMaxLine = (req, res) => {
  const ingredient = {
    line: parseInt(req.params.line, 10),
    recipe_id: parseInt(req.params.recipeId, 10),
  };

  models.recipe_ingredient_quantity
    .deleteByMaxLine(ingredient)
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
  // read,
  readByRecipe,
  readByLineAndRecipeId,
  readByRecipeForEdit,
  add,
  edit,
  destroyByMaxLine,
  destroy,
};
