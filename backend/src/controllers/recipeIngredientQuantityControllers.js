const models = require("../models");

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
  destroy,
};
