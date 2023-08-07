import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import Loading from "@components/Loading/Loading";
import Card from "@components/Card/Card";
import StepsAndIngredients from "@components/RecipeId/StepsAndIngredients";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import buttonIcon from "@assets/icons/wand.svg";

import "@components/RecipeId/RecipeId.scss";

export default function RecipeId() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      instance
        .get(`/recipes/${id}`)
        .then((result) => {
          if (result.data.user_id !== user.id && !result.data.is_approved) {
            return navigate("/");
          }
          return setRecipe(result.data);
        })
        .then(() =>
          instance
            .get(`/recipes/ingredients/${id}`)
            .then((res) => setIngredients(res.data))
            .catch((err) => {
              console.error(err);
            })
        )
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
        <section className="RecipeId">
          <Card recipe={recipe} />
          <div>
            <h3>Ingredients</h3>
            <p>
              {ingredients.map((ingredient) => (
                <StepsAndIngredients
                  text={`${ingredient.line}, ${ingredient.recipe_id}, ${ingredient.ingredient_id}, ${ingredient.quantity_id}`}
                  key={ingredient.id}
                />
              ))}
            </p>
          </div>

          <div>
            <h3>Preparation</h3>
            <p>
              {recipe.steps.split("___").map((step, index) => (
                <StepsAndIngredients
                  text={`${index + 1}. ${step}`}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                />
              ))}
            </p>
          </div>
          {user.id ? (
            <ButtonRecipe
              icon={buttonIcon}
              text="Edit recipe"
              handleClick={() => navigate(`/edit-recipe/${id}`)}
            />
          ) : (
            ""
          )}
        </section>
      )}
    </>
  );
}
