import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";

function AdminIngredients() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role_id !== 3) {
      navigate("/");
    } else {
      document.title = "Ingredients - Admin - Vegan Witch Pot";
    }
  }, []);

  return (
    <section className="AdminIngredients">
      <h1>AdminIngredients</h1>

      <p>AdminIngredients Component</p>
    </section>
  );
}

export default AdminIngredients;
