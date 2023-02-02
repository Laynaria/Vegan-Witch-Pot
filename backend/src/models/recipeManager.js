const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  insert(recipe) {
    return this.connection.query(
      `insert into ${this.table} (picture, title, difficulty, cooking_time) values (?, ?, ?, ?)`,
      [recipe.picture, recipe.title, recipe.difficulty, recipe.cooking_time]
    );
  }

  update(recipe) {
    return this.connection.query(
      `update ${this.table} set picture = ?, title = ?, difficulty = ?, cooking_time = ? where id = ?`,
      [
        recipe.picture,
        recipe.title,
        recipe.difficulty,
        recipe.cooking_time,
        recipe.id,
      ]
    );
  }
}

module.exports = RecipeManager;
