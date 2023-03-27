const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  insert(recipe) {
    return this.connection.query(
      `insert into ${this.table} (thumbnail, title, difficulty, cooking_time) values (?, ?, ?, ?)`,
      [recipe.thumbnail, recipe.title, recipe.difficulty, recipe.cooking_time]
    );
  }

  update(recipe) {
    return this.connection.query(
      `update ${this.table} set thumbnail = ?, title = ?, difficulty = ?, cooking_time = ? where id = ?`,
      [
        recipe.thumbnail,
        recipe.title,
        recipe.difficulty,
        recipe.cooking_time,
        recipe.id,
      ]
    );
  }
}

module.exports = RecipeManager;
