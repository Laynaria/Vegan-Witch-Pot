import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";

import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import buttonIcon from "@assets/logos/logo_mini.svg";

import Card from "@components/Card/Card";
import Loading from "@components/Loading/Loading";
import "@components/Recipes/Recipes.scss";

import { AuthContext } from "@contexts/AuthContext";

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [arrayRecipes, setArrayRecipes] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      instance
        .get("/recipes")
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
          <h1>Recipes</h1>
          {arrayRecipes
            .map((recipe) => <Card recipe={recipe} key={recipe.id} />)
            .reverse()}

          {user.id !== undefined ? (
            <ButtonRecipe
              icon={buttonIcon}
              text="New recipe"
              handleClick={() => navigate("/add-recipe")}
            />
          ) : (
            ""
          )}
        </section>
      )}
    </>
  );
}