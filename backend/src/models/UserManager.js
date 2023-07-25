const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAll() {
    return this.connection.query(
      `select id, username, email, role_id from ${this.table}`
    );
  }

  find(id) {
    return this.connection.query(
      `select id, username, email, is_avatar, role_id from  ${this.table} where id = ?`,
      [id]
    );
  }

  findByEmail(email) {
    return this.connection.query(
      `select id, role_id, email, password from ${this.table} where email = ?`,
      [email]
    );
  }

  findIfEmailExist(email) {
    return this.connection.query(
      `select id, email from  ${this.table} where email = ?`,
      [email]
    );
  }

  findIfUsernameExist(username) {
    return this.connection.query(
      `select id, username from  ${this.table} where username = ?`,
      [username]
    );
  }

  findForDelete(id) {
    // we can maybe remove user id and recipe id from this one depending on
    // next course of action for users related requests
    // in that case it could be better to switch those functions to other managers/controllers
    return this.connection.query(
      `SELECT u.id as user_id, r.id as recipe_id, riq.id as recipe_ingredient_quantity_id FROM ${this.table} AS u INNER JOIN recipe as r ON u.id = r.user_id INNER JOIN recipe_ingredient_quantity as riq ON r.id = riq.recipe_id WHERE u.id = ?`,
      [id]
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (username, email, password) values (?, ?, ?)`,
      [user.username, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set  email = ?, username = ? where id = ?`,
      [user.email, user.username, user.id]
    );
  }

  updatePassword(user) {
    return this.connection.query(
      `update ${this.table} set password = ? where id = ?`,
      [user.hashedPassword, user.id]
    );
  }
}

module.exports = UserManager;
