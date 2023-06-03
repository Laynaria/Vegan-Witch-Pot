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
  // atm it only delete user, it needs to first delete recipes and menus
  // where user id = req.params.id
  // and menu_recipes where menu.id and recipe_ingredient_quantity

  // can replace by a req.body.id à la place. Pour permettre de delete multiple

  // const recipesIdArray = [];
  // const recipesIngredientQuantityIdArray = [];

  // models.recipe
  //   .findByUserId(req.params.id)
  //   .then(([rows]) => {
  //     if (rows[0] == null) {
  //       res.sendStatus(404);
  //     } else {
  //       rows.forEach((element) => {
  //         recipesIdArray.push(element.id);
  //       });
  //     }
  //   })
  //   .then(() => {
  //     models.recipe_ingredient_quantity
  //       .findByRecipeId(recipesIdArray)
  //       .then(([rows]) => {
  //         if (rows[0] == null) {
  //           res.sendStatus(404);
  //         } else {
  //           rows.forEach((element) => {
  //             recipesIngredientQuantityIdArray.push(element.id);
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         res.sendStatus(500);
  //       });
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.sendStatus(500);
  //   });

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

module.exports = {
  browse,
  read,
  // add,
  // log,
  // edit,
  // editPassword,
  destroy,
  selectForDelete,
};
