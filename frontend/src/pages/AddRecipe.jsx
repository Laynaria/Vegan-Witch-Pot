import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = () => {
    // must add validations of having nothing null etc

    instance
      .post("/recipes", recipe)
      .then(() => navigate("/recipes"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  return (
    <main id="flex-row">
      <section className="edit">
        <form onChange={handleChange}>
          <label>
            Title
            <input type="text" name="title" value={recipe.title} />
          </label>
          <label>
            Picture Link
            {/* should maybe change it to an input type link */}
            <input type="text" name="picture" value={recipe.picture} />
          </label>
          <label>
            Difficulty
            <input
              type="range"
              name="difficulty"
              value={recipe.difficulty}
              min="1"
              max="5"
            />
          </label>
          <label>
            Cooking Time
            <input
              type="text"
              name="cooking_time"
              value={recipe.cooking_time}
            />
          </label>
        </form>
        <form onChange={handleChange}>Yet to come.</form>
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
        <button type="button" className="add-button" onClick={handleSubmit}>
          +
        </button>
      </section>
    </main>
  );
}
