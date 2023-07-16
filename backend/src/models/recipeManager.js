const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  findLast() {
    return this.connection.query(
      `select * from  ${this.table} ORDER BY id DESC LIMIT 3`
    );
  }

  findByUserId(userId) {
    // This requset is to find all recipes from a user, to get their id for some delete purposes.
    return this.connection.query(
      `select id from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  insert(recipe) {
    return this.connection.query(
      `insert into ${this.table} (thumbnail, title, difficulty, cooking_time, user_id, is_shared, is_approved, origin, steps, category_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.thumbnail,
        recipe.title,
        recipe.difficulty,
        recipe.cooking_time,
        recipe.user_id,
        recipe.is_shared,
        recipe.is_approved,
        recipe.origin,
        recipe.steps,
        recipe.category_id,
      ]
    );
  }

  update(recipe) {
    return this.connection.query(
      `update ${this.table} set thumbnail = ?, title = ?, difficulty = ?, cooking_time = ?, is_shared = ?, is_approved = ?, origin = ?, steps = ?, category_id = ? where id = ?`,
      [
        recipe.thumbnail,
        recipe.title,
        recipe.difficulty,
        recipe.cooking_time,
        recipe.is_shared,
        recipe.is_approved,
        recipe.origin,
        recipe.steps,
        recipe.category_id,
        recipe.id,
      ]
    );
  }
}

module.exports = RecipeManager;
