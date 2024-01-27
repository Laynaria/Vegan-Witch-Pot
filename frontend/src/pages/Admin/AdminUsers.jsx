import { useEffect } from "react";

function AdminUsers() {
  useEffect(() => {
    document.title = "Users - Admin - Vegan Witch Pot";
  }, []);

  return (
    <section className="AdminUsers">
      <h1>AdminUsers</h1>

      <p>AdminUsers Component</p>
    </section>
  );
}

export default AdminUsers;
