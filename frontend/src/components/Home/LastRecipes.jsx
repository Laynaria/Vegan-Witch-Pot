import { useState, useEffect } from "react";
import instance from "@services/instance";

import Card from "@components/Card/Card";
import Loading from "@components/Loading/Loading";
import "@components/Recipes/Recipes.scss";

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [arrayRecipes, setArrayRecipes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      instance
        .get("/last-recipes")
        .then((result) => {
          setArrayRecipes(result.data);
        })
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.error(err);
        });
    }, 550);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="Recipes">
          <h1>Last Recipes</h1>
          {arrayRecipes.map((recipe) => (
            <Card recipe={recipe} key={recipe.id} />
          ))}

          <div className="recipeMargin" />
        </section>
      )}
    </>
  );
}
