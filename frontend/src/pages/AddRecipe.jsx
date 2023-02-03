import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";

import Card from "@components/Card/Card";

import "@components/AddRecipe/AddRecipe.scss";
import FormsRecipe from "@components/Recipes/FormsRecipe";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    picture: "grilled_peas.png",
    title: "Grilled Peas",
    difficulty: 1,
    cooking_time: "3h",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    // must add validations of having nothing null etc

    instance
      .post("/recipes", recipe)
      .then(() => navigate("/recipes"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  return (
    <main id="flex-row">
      <FormsRecipe recipe={recipe} setRecipe={setRecipe} />
      <section className="preview">
        <h2>Preview</h2>
        <Card recipe={recipe} />
        <button type="button" className="recipe-button" onClick={handleSubmit}>
          +
        </button>
      </section>
    </main>
  );
}
