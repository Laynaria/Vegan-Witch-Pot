import { useState, useEffect } from "react";
import instance from "@services/instance";

import spoon from "@assets/icons/spoon.svg";
import timeImg from "@assets/logos/logo_mini.svg";
import grilledPeas from "@assets/recipes/mini/grilled_peas.png";

import "./Recipes.scss";

export default function Recipes() {
  const [arrayRecipes, setArrayRecipes] = useState([
    {
      id: 1,
      title: "Grilled Peas",
      desc: "description",
      difficulty: "1",
      time: "30min",
    },
    {
      id: 2,
      title: "Recette",
      desc: "description",
      difficulty: "2",
      time: "10min",
    },
    {
      id: 3,
      title: "Recette",
      desc: "description",
      difficulty: "3",
      time: "15min",
    },
    {
      id: 4,
      title: "Recette",
      desc: "description",
      difficulty: "4",
      time: "20min",
    },
    {
      id: 5,
      title: "Recette",
      desc: "description",
      difficulty: "5",
      time: "30min",
    },
    {
      id: 6,
      title: "Recette",
      desc: "description",
      difficulty: "5",
      time: "25min",
    },
    {
      id: 7,
      title: "Recette",
      desc: "description",
      difficulty: "2",
      time: "75min",
    },
    {
      id: 8,
      title: "Recette",
      desc: "description",
      difficulty: "4",
      time: "25min",
    },
    {
      id: 9,
      title: "Recette",
      desc: "description",
      difficulty: "3",
      time: "1h",
    },
    {
      id: 10,
      title: "Recette",
      desc: "description",
      difficulty: "2",
      time: "1h",
    },
    {
      id: 11,
      title: "Five Star",
      desc: "description",
      difficulty: "5",
      time: "3h",
    },
    {
      id: 12,
      title: "Recette",
      desc: "description",
      difficulty: "1",
      time: "4h",
    },
    {
      id: 13,
      title: "Two Star",
      desc: "description",
      difficulty: "2",
      time: "24h",
    },
    {
      id: 14,
      title: "Recette",
      desc: "description",
      difficulty: "3",
      time: "48h",
    },
    {
      id: 15,
      title: "Recette",
      desc: "description",
      difficulty: "1",
      time: "1h",
    },
    {
      id: 16,
      title: "Recette",
      desc: "description",
      difficulty: "1",
      time: "1h30",
    },
    {
      id: 17,
      title: "Four Star",
      desc: "description",
      difficulty: "4",
      time: "7h",
    },
    {
      id: 18,
      title: "Three Star",
      desc: "description",
      difficulty: "3",
      time: "22min",
    },
    {
      id: 19,
      title: "One Star",
      desc: "description",
      difficulty: "1",
      time: "1h45",
    },
  ]);

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
          <img src={grilledPeas} alt={recipe.title} className="card-img" />
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
