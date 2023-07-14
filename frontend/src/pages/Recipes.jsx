import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@services/instance";

import ThumbnailRecipe from "@components/Recipes/ThumbnailRecipe";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";
import buttonIcon from "@assets/logos/logo_mini.svg";

import Card from "@components/Card/Card";
import Loading from "@components/Loading/Loading";
import "@components/Recipes/Recipes.scss";

import { AuthContext } from "@contexts/AuthContext";

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [arrayRecipes, setArrayRecipes] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    difficulty: "0",
    category_id: "0",
    cooking_time: "",
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

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
          <ThumbnailRecipe recipe={filters} handleChange={handleChange} />
          {arrayRecipes
            .filter(
              (recipe) =>
                (recipe.category_id === parseInt(filters.category_id, 10) ||
                  filters.category_id === "0") &&
                (recipe.difficulty === parseInt(filters.difficulty, 10) ||
                  filters.difficulty === "0") &&
                filters.title
                  .trim()
                  .split(" ")
                  .some((element) =>
                    recipe.title
                      .toLowerCase()
                      .split(" ")
                      .some((el) => el.startsWith(element.toLowerCase()))
                  ) &&
                recipe.cooking_time
                  .toLowerCase()
                  .startsWith(filters.cooking_time.toLowerCase())
            )
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
          <div className="recipeMargin" />
        </section>
      )}
    </>
  );
}
