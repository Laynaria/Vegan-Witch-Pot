const AbstractManager = require("./AbstractManager");

class RecipeIngredientQuantityManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_ingredient_quantity" });
  }

  findByLineAndRecipeId(ingredient) {
    // this request is to check if an ingredient in the joint table exist when updating a recipe
    return this.connection.query(
      `SELECT id from ${this.table} where line = ? and recipe_id = ?`,
      [ingredient.line, ingredient.recipe_id]
    );
  }

  findByRecipe(recipe) {
    // this request is to get all necessary infos for ingredients informations on a recipe page
    return this.connection.query(
      `select line, name, value, type, unit from ${this.table} AS riq INNER JOIN ingredient AS i ON riq.ingredient_id = i.id INNER JOIN quantity AS q ON riq.quantity_id = q.id INNER JOIN type AS t ON q.type_id = t.id where recipe_id = ? ORDER BY line ASC`,
      [recipe]
    );
  }

  findByRecipeForEdit(recipe) {
    // this request is to get all necessary infos for ingredients informations on a recipe page
    return this.connection.query(
      `select * from ${this.table} AS riq INNER JOIN ingredient AS i ON riq.ingredient_id = i.id INNER JOIN quantity AS q ON riq.quantity_id = q.id INNER JOIN type AS t ON q.type_id = t.id where recipe_id = ? ORDER BY line ASC`,
      [recipe]
    );
  }

  insert(ingredient) {
    return this.connection.query(
      `insert into ${this.table} (line, recipe_id, ingredient_id, quantity_id) values (?, ?, ?, ?)`,
      [
        ingredient.line,
        ingredient.recipe_id,
        ingredient.ingredient_id,
        ingredient.quantity_id,
      ]
    );
  }

  update(ingredient) {
    return this.connection.query(
      `update ${this.table} set line = ?, recipe_id = ?, ingredient_id = ?, quantity_id = ? where id = ?`,
      [
        ingredient.line,
        ingredient.recipe_id,
        ingredient.ingredient_id,
        ingredient.quantity_id,
        ingredient.id,
      ]
    );
  }

  deleteByMaxLine(ingredient) {
    return this.connection.query(
      `delete from ${this.table} where recipe_id = ? and line > ?`,
      [ingredient.recipe_id, ingredient.line]
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
