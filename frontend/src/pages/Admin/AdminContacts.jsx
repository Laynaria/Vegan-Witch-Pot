import { useEffect } from "react";

function AdminContacts() {
  useEffect(() => {
    document.title = "Contacts - Admin - Vegan Witch Pot";
  }, []);

  return (
    <section className="AdminContacts">
      <h1>AdminContacts</h1>

      <p>AdminContacts Component</p>
    </section>
  );
}

export default AdminContacts;
