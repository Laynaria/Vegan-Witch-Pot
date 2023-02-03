import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "@services/instance";

import "./Recipes.scss";
import Card from "@components/Card/Card";

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
      {arrayRecipes.map((recipe) => <Card recipe={recipe} />).reverse()}
      <Link to="/add-recipe" className="add-button">
        <h2>+</h2>
      </Link>
    </section>
  );
}
