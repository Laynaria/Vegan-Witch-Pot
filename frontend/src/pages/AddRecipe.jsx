import { useState } from "react";

import spoon from "@assets/icons/spoon.svg";
import timeImg from "@assets/logos/logo_mini.svg";

import "@components/AddRecipe/AddRecipe.scss";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    picture: "grilled_peas.png",
    title: "Grilled Peas",
    difficulty: 1,
    cooking_time: "3h",
  });

  console.warn(setRecipe);

  return (
    <main id="flex-row">
      <section className="edit">
        <form>a</form>
        <form>b</form>
      </section>
      <section className="preview">
        <h2>Preview</h2>
        <div className="card">
          <img
            src={`http://localhost:3000/src/assets/recipes/mini/${recipe.picture}`}
            alt={recipe.title}
            className="card-img"
          />
          <h2>{recipe.title}</h2>
          <p>
            <span>
              {/* {recipe.difficulty} */}
              <img src={spoon} alt="Difficulty" />
              <img
                src={spoon}
                alt="Difficulty"
                className={recipe.difficulty >= 2 ? "" : "greyed-spoon"}
              />
              <img
                src={spoon}
                alt="Difficulty"
                className={recipe.difficulty >= 3 ? "" : "greyed-spoon"}
              />
              <img
                src={spoon}
                alt="Difficulty"
                className={recipe.difficulty >= 4 ? "" : "greyed-spoon"}
              />
              <img
                src={spoon}
                alt="Difficulty"
                className={recipe.difficulty >= 5 ? "" : "greyed-spoon"}
              />
            </span>
            <span>
              <img src={timeImg} alt="Time" />
              {recipe.cooking_time}
            </span>
          </p>
        </div>
        <button type="button" className="add-button">
          +
        </button>
      </section>
    </main>
  );
}
