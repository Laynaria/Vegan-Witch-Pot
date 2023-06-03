const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAll() {
    return this.connection.query(
      `select id, username, email, role_id from  ${this.table}`
    );
  }

  find(id) {
    return this.connection.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findForDelete(id) {
    // on peut potentiellement retirer les select user id
    // et recipe id, pour ne récupérer au final que les ingredients quantity
    // tout dépendra de nos nécessités
    return this.connection.query(
      `SELECT u.id as user_id, r.id as recipe_id, riq.id as recipe_ingredient_quantity_id FROM ${this.table} AS u INNER JOIN recipe as r ON u.id = r.user_id INNER JOIN recipe_ingredient_quantity as riq ON r.id = riq.recipe_id WHERE u.id = ?`,
      [id]
    );
  }
}

module.exports = UserManager;
