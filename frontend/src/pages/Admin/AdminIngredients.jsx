import { useEffect } from "react";

function AdminIngredients() {
  useEffect(() => {
    document.title = "Ingredients - Admin - Vegan Witch Pot";
  }, []);

  return (
    <section className="AdminIngredients">
      <h1>AdminIngredients</h1>

      <p>AdminIngredients Component</p>
    </section>
  );
}

export default AdminIngredients;
