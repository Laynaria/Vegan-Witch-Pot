const AbstractManager = require("./AbstractManager");

class RecipeIngredientQuantityManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_ingredient_quantity" });
  }

  findByRecipe(recipe) {
    // this request is to get all necessary infos for ingredients informations on a recipe page
    return this.connection.query(
      `select line, name, value, type, unit from ${this.table} AS riq INNER JOIN ingredient AS i ON riq.ingredient_id = i.id INNER JOIN quantity AS q ON riq.quantity_id = q.id INNER JOIN type AS t ON q.type_id = t.id where recipe_id = ? ORDER BY line ASC`,
      [recipe]
    );
  }

  deleteByRecipeId(recipesId) {
    // This requset is to find all recipes_ingredient_quantity tuples from multiple recipe, to get their id for some delete purposes.
    return this.connection.query(
      `delete from ${this.table} where recipe_id IN (?)`,
      [recipesId]
    );
  }
}

module.exports = RecipeIngredientQuantityManager;
