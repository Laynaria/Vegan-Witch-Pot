import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";
import Loading from "@components/Loading/Loading";
import Card from "@components/Card/Card";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import buttonIcon from "@assets/icons/wand.svg";

export default function RecipeId() {
  const [recipe, setRecipe] = useState({});
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
          <p>
            <h3>Ingredients</h3>
          </p>
          <p>
            <h3>Preparation</h3>
          </p>
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
