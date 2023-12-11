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

  const handleSubmit = async () => {
    // must add validations of having nothing null etc

    // First we check if there is at least one valid ingredient, knowing only valid ingredients will be saved in db.
    const ingredientsToPush = ingredients.filter((ingredient) =>
      parseInt(ingredient.type_id, 10) !== 8
        ? ingredient.value !== "" && ingredient.name !== ""
        : ingredient.name !== ""
    );

    if (ingredientsToPush.length === 0) {
      return;
    }

    // Second we check if there is a picture, and if this picture is valid.
    if (inputRef.current.files[0]) {
      if (
        inputRef.current.files[0].type !== "image/jpeg" &&
        inputRef.current.files[0].type !== "image/jpg" &&
        inputRef.current.files[0].type !== "image/png"
      ) {
        return;
      }
    }

    try {
      // We post the main informations of the recipe.
      await instance.put(`/recipes/${id}`, {
        ...recipe,
        steps: stepsArray.filter((item) => item !== "").join("___"),
      });

      // If we have a picture, we create a new form for that recipe and upload it
      if (inputRef.current.files[0]) {
        const formData = await new FormData();
        await formData.append("recipePic", inputRef.current.files[0]);
        await instance.post(`/uploads/recipes/${recipe.id}`, formData);
      }

      // We call the function to register ingredients for that recipe, and navigate to that new recipe page
      await registerIngredient(ingredients, id, ingredientsOriginLength);

      navigate(`/recipes/${id}`);
    } catch {
      console.warn("Une erreur est survenue!");
    }
  };

  const handleDelete = async () => {
    try {
      // First we get the recipe_ingredient_quantity ids needed for deleting all users info
      const recipeIngredientQuantityIds = [];
      const { data } = await instance.get(
        `/users/delete-info/${recipe.user_id}`
      );

      await data.forEach((el) => {
        // we check if recipe_id from each entry are equal to the current recipe id
        // and push the valid ones in an array
        if (el.recipe_id === parseInt(id, 10)) {
          recipeIngredientQuantityIds.push(el.recipe_ingredient_quantity_id);
        }
      });

      // We can now delete entries from the joint table if the array is not empty
      if (recipeIngredientQuantityIds.length !== 0) {
        await instance.delete(`/recipe-ingredient-quantity/0/${id}`);
      }

      // // finally we delete the recipe and navigate back to recipes page
      await instance.delete(`/recipes/${id}`);

      navigate("/recipes");
    } catch {
      //
    }
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
