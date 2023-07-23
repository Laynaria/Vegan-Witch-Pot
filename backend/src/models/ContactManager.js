const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  insert(contact) {
    return this.connection.query(
      `insert into ${this.table} (email, object, message) values (?, ?, ?)`,
      [contact.email, contact.object, contact.message]
    );
  }

  update(contact) {
    return this.connection.query(
      `update ${this.table} set is_read = ? where id = ?`,
      [contact.is_read, contact.id]
    );
  }
}

module.exports = ContactManager;
