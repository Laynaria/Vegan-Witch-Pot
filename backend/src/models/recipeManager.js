const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  findByUserId(userId) {
    // This requset is to find all recipes from a user, to get their id for some delete purposes.
    return this.connection.query(
      `select id from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  insert(recipe) {
    // a ajouter : steps, origin, is_shared, user_id, category_id
    return this.connection.query(
      `insert into ${this.table} (thumbnail, title, difficulty, cooking_time) values (?, ?, ?, ?)`,
      [recipe.thumbnail, recipe.title, recipe.difficulty, recipe.cooking_time]
    );
  }

  update(recipe) {
    // a ajouter : steps, origin, is_shared, is_approved, user_id, category_id
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
