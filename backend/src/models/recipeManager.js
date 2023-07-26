const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  findLast() {
    return this.connection.query(
      `select * from  ${this.table} WHERE is_shared = true and is_approved = true ORDER BY id DESC LIMIT 3`
    );
  }

  findByUserId(userId) {
    // This requset is to find all recipes from a user, to get their id for some delete purposes.
    return this.connection.query(
      `select id from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  findForUpload(recipe) {
    return this.connection.query(
      `select id from ${this.table} WHERE is_thumbnail = ? and title = ? and difficulty = ? and cooking_time = ? and user_id = ? and is_shared = ? and is_approved = ? and origin = ? and steps = ? and category_id = ? ORDER BY id DESC LIMIT 1`,
      [
        recipe.is_thumbnail,
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

  insert(recipe) {
    return this.connection.query(
      `insert into ${this.table} (is_thumbnail, title, difficulty, cooking_time, user_id, is_shared, is_approved, origin, steps, category_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.is_thumbnail,
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
      `update ${this.table} set is_thumbnail = ?, title = ?, difficulty = ?, cooking_time = ?, is_shared = ?, is_approved = ?, origin = ?, steps = ?, category_id = ? where id = ?`,
      [
        recipe.is_thumbnail,
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

  deleteByUser(id) {
    return this.connection.query(
      `delete from ${this.table} where user_id = ?`,
      [id]
    );
  }
}

module.exports = RecipeManager;
