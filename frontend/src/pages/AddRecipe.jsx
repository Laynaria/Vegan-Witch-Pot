import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";

import FormsRecipe from "@components/Recipes/FormsRecipe";
import Card from "@components/Card/Card";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";

import buttonIcon from "@assets/logos/logo_mini.svg";

import "@components/AddRecipe/AddRecipe.scss";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    thumbnail: "grilled_peas.png",
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

        <ButtonRecipe
          icon={buttonIcon}
          text="Add recipe"
          handleClick={handleSubmit}
        />
      </section>
    </main>
  );
}
