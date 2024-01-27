import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "@services/instance";

import ThumbnailRecipe from "@components/Recipes/ThumbnailRecipe";
import ButtonRecipe from "@components/Button/ButtonRecipe";
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
  const [isMyRecipes, setIsMyRecipes] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const filterOptions = (recipe) =>
    ((recipe.is_shared === 1 && recipe.is_approved === 1) ||
      recipe.user_id === user.id) &&
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
    recipe.title.toLowerCase().includes(filters.title.trim().toLowerCase()) &&
    recipe.cooking_time
      .toLowerCase()
      .startsWith(filters.cooking_time.toLowerCase()) &&
    (isMyRecipes ? recipe.user_id === user.id : recipe);

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

  const handleResetFilter = () => {
    setIsMyRecipes(false);
    setFilters({
      title: "",
      difficulty: "0",
      category_id: "0",
      cooking_time: "",
    });
  };

  useEffect(() => {
    document.title = "Recipes - Vegan Witch Pot";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="Recipes">
          <h1>Recipes</h1>
          <ThumbnailRecipe
            recipe={filters}
            handleChange={handleChange}
            isMyRecipes={isMyRecipes}
            setIsMyRecipes={setIsMyRecipes}
            userId={user.id}
            handleResetFilter={handleResetFilter}
          />

          {arrayRecipes.filter((recipe) => filterOptions(recipe)).length !==
          0 ? (
            arrayRecipes
              .filter((recipe) => filterOptions(recipe))
              .map((recipe) => (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                  <Card recipe={recipe} />
                </Link>
              ))
              .reverse()
          ) : (
            <p className="NoRecipes">
              No recipes available with theses filters.
            </p>
          )}

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
