const AbstractManager = require("./AbstractManager");

class RecipeIngredientQuantityManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_ingredient_quantity" });
  }

  findByRecipe(recipe) {
    return this.connection.query(
      `select * from ${this.table} where recipe_id = ?`,
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
