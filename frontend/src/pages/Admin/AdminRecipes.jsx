import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";

function AdminRecipes() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role_id !== 3) {
      navigate("/");
    } else {
      document.title = "Recipes - Admin - Vegan Witch Pot";
    }
  }, []);

  return (
    <section className="AdminRecipes">
      <h1>AdminRecipes</h1>

      <p>AdminRecipes Component</p>
    </section>
  );
}

export default AdminRecipes;
