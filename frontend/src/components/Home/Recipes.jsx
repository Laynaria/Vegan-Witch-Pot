import { useState, useEffect } from "react";
import instance from "@services/instance";

import spoon from "@assets/icons/spoon.svg";
import timeImg from "@assets/logos/logo_mini.svg";

import "./Recipes.scss";

export default function Recipes() {
  const [arrayRecipes, setArrayRecipes] = useState([]);

  useEffect(() => {
    instance
      .get("/recipes")
      .then((result) => {
        setArrayRecipes(result.data);
        console.warn(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="Recipes">
      <h1>Recipes</h1>
      {arrayRecipes.map((recipe) => (
        <div className="card" key={recipe.id}>
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
              {recipe.time}
            </span>
          </p>
        </div>
      ))}
    </section>
  );
}
