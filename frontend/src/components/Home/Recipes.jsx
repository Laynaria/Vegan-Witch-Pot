import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";

import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import buttonIcon from "@assets/logos/logo_mini.svg";

import "./Recipes.scss";
import Card from "@components/Card/Card";

export default function Recipes() {
  const [arrayRecipes, setArrayRecipes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/recipes")
      .then((result) => {
        setArrayRecipes(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className="Recipes">
      <h1>Recipes</h1>
      {arrayRecipes.map((recipe) => <Card recipe={recipe} />).reverse()}

      <ButtonRecipe
        icon={buttonIcon}
        text="New recipe"
        handleClick={() => navigate("/add-recipe")}
      />
    </section>
  );
}
