const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "quantity" });
  }

  findByValueAndTypeId(quantity) {
    return this.connection.query(
      `SELECT id from ${this.table} where value = ? and type_id = ?`,
      [quantity.value, quantity.type_id]
    );
  }

  insert(quantity) {
    return this.connection.query(
      `insert into ${this.table} (value, type_id) values (?, ?)`,
      [quantity.value, quantity.type_id]
    );
  }

  update(quantity) {
    return this.connection.query(
      `update ${this.table} set name = ? where id = ?`,
      [quantity.name, quantity.id]
    );
  }
}

module.exports = ItemManager;
