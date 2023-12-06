import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";

import FormsRecipe from "@components/Recipes/FormsRecipe";
import Card from "@components/Card/Card";
import ButtonRecipe from "@components/Button/ButtonRecipe";

import basicThumbnail from "@assets/recipes/mini/bowl.png";
import buttonIcon from "@assets/logos/logo_mini.svg";

import "@components/Recipes/AddRecipe.scss";
import registerIngredient from "@services/registerIngredient";

export default function AddRecipe() {
  const inputRef = useRef();
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    is_thumbnail: false,
    title: "Grilled Peas",
    difficulty: 1,
    cooking_time: "3h",
    user_id: user.id,
    steps: "",
    category_id: 4,
    is_shared: 0,
    is_approved: 0,
    // Waiting their form inputs
    origin: "",
  });
  const [thumbnail, setThumbnail] = useState(basicThumbnail);
  const [stepsArray, setStepsArray] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { line: 1, value: "", name: "", type_id: 1 },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user.id === undefined) {
        navigate("/login");
      }
      setIsLoading(false);
    }, 100);
  }, []);

  const handleSubmit = async () => {
    // must add more validations

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
      await instance.post("/recipes", {
        ...recipe,
        steps: stepsArray.filter((item) => item !== "").join("___"),
      });

      // We get back the id from our newly created recipe, by checking everything to be equal.
      const recipeId = await instance.post("/check-new-recipe", {
        ...recipe,
        steps: stepsArray.filter((item) => item !== "").join("___"),
      });

      // If we have a picture, we create a new form for that recipe and upload it
      if (inputRef.current.files[0]) {
        const formData = await new FormData();
        await formData.append("recipePic", inputRef.current.files[0]);
        await instance.post(`/uploads/recipes/${recipeId.data.id}`, formData);
      }

      // We call the function to register ingredients for that recipe, and navigate to that new recipe page
      await registerIngredient(ingredients, recipeId.data.id);

      navigate(`/recipes/${recipeId.data.id}`);
    } catch {
      console.warn("Une erreur est survenue!");
    }
  };

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
          icon={buttonIcon}
          text="Add recipe"
          handleClick={handleSubmit}
          hassPopUp
          textValidation="create this recipe"
        />
      </section>
    </div>
  );
}
