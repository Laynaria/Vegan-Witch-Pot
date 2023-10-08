const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "ingredient" });
  }

  findByName(name) {
    return this.connection.query(
      `SELECT id from ${this.table} where name = ?`,
      [name]
    );
  }

  insert(ingredient) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [ingredient.name]
    );
  }

  update(ingredient) {
    return this.connection.query(
      `update ${this.table} set name = ? where id = ?`,
      [ingredient.name, ingredient.id]
    );
  }
}

module.exports = ItemManager;
