import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";

import FormsRecipe from "@components/Recipes/FormsRecipe";
import Card from "@components/Card/Card";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import registerIngredient from "@services/registerIngredient";

import basicThumbnail from "@assets/recipes/mini/bowl.png";
import editIcon from "@assets/icons/wand.svg";
import deleteIcon from "@assets/icons/broom.svg";

import "@components/Recipes/AddRecipe.scss";

export default function EditRecipe() {
  const inputRef = useRef();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    is_thumbnail: false,
    title: "Grilled Peas",
    difficulty: 1,
    cooking_time: "3h",
    user_id: user.id,
    steps: "",
    category_id: 4,
    is_shared: false,
    is_approved: false,
    // Waiting their form inputs
    origin: "",
  });
  const [thumbnail, setThumbnail] = useState(basicThumbnail);
  const [stepsArray, setStepsArray] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { line: 1, value: "", name: "", type_id: 1 },
  ]);
  const [ingredientsOriginLength, setIngredientsOriginLength] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = () => {
    // must add validations of having nothing null etc
    const formData = new FormData();
    formData.append("recipePic", inputRef.current.files[0]);

    instance
      .put(`/recipes/${id}`, {
        ...recipe,
        steps: stepsArray.filter((item) => item !== "").join("___"),
      })
      .then(() => navigate(`/recipes/${id}`))
      .then(() => {
        if (inputRef.current.files[0]) {
          if (
            inputRef.current.files[0].type !== "image/jpeg" &&
            inputRef.current.files[0].type !== "image/jpg" &&
            inputRef.current.files[0].type !== "image/png"
          ) {
            return;
          }

          instance
            .post(`/uploads/recipes/${recipe.id}`, formData)
            .catch((err) => console.error(err));
        }
      })
      .then(() => registerIngredient(ingredients, id, ingredientsOriginLength))
      .then(() => navigate(`/recipes/${id}`))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleDelete = () => {
    // First we get the recipe_ingredient_quantity ids needed for deleting all users info
    const recipeIngredientQuantityIds = [];

    instance
      .get(`/users/delete-info/${recipe.user_id}`)
      .then((res) =>
        res.data.forEach((el) => {
          // we check if recipe_id from each entry are equal to the current recipe id
          // and push the valid ones in an array
          if (el.recipe_id === parseInt(id, 10)) {
            recipeIngredientQuantityIds.push(el.recipe_ingredient_quantity_id);
          }
        })
      )
      // We can now delete entries from the joint table using the array
      .then(() => {
        if (recipeIngredientQuantityIds.length !== 0) {
          instance
            .delete(`/recipe-ingredient-quantity/0/${id}`)
            .catch((err) => {
              console.error(err);
            });
        }
      })
      // finally we delete the recipe and navigate back to recipes page
      .then(() =>
        instance.delete(`/recipes/${id}`).catch((err) => {
          console.error(err);
        })
      )
      .then(() => navigate("/recipes"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  useEffect(() => {
    setTimeout(() => {
      // check if user is logged, else reddirect user
      if (user.id === undefined) {
        navigate("/login");
      }

      // get data from recipe
      instance
        .get(`/recipes/${id}`)
        .then((result) => {
          if (user.id !== result.data.user_id && user.role_id !== 3) {
            navigate("/login");
          }

          setRecipe({ ...result.data, is_approved: false });
          setStepsArray(result.data.steps.split("___"));

          if (result.data.is_thumbnail) {
            setThumbnail(
              `${import.meta.env.VITE_BACKEND_URL}/uploads/recipes/${
                result.data.id
              }.png`
            );
          }
        })
        .then(() =>
          instance
            .get(`/recipes/edit/ingredients/${id}`)
            .then((res) => {
              setIngredients(res.data);
              setIngredientsOriginLength(res.data.length);
            })
            .catch((err) => {
              console.error(err);
            })
        )
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.error("Error: This recipe doesn't exist", err);
          navigate("/error-404");
        });
    }, 100);
  }, []);

  return (
    <div className={isLoading ? "hide" : "flex-row"}>
      <FormsRecipe
        user={user}
        recipe={recipe}
        setRecipe={setRecipe}
        inputRef={inputRef}
        setThumbnail={setThumbnail}
        stepsArray={stepsArray}
        setStepsArray={setStepsArray}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <section className="preview">
        <h2>Preview</h2>
        <Card recipe={recipe} thumbnail={thumbnail} />

        <ButtonRecipe
          icon={editIcon}
          text="Edit"
          handleClick={handleSubmit}
          hassPopUp
          textValidation="edit this recipe"
        />

        <ButtonRecipe
          icon={deleteIcon}
          text="Delete"
          handleClick={handleDelete}
          hassPopUp
          textValidation="delete this recipe"
        />
      </section>
    </div>
  );
}
