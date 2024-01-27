import { useEffect } from "react";

function AdminRecipes() {
  useEffect(() => {
    document.title = "Recipes - Admin - Vegan Witch Pot";
  }, []);

  return (
    <section className="AdminRecipes">
      <h1>AdminRecipes</h1>

      <p>AdminRecipes Component</p>
    </section>
  );
}

export default AdminRecipes;
