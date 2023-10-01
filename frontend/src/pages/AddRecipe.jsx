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
  const [ingredients, setIngredients] = useState([{ line: 1 }]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user.id === undefined) {
        navigate("/login");
      }
      setIsLoading(false);
    }, 100);
  }, []);

  const handleSubmit = () => {
    // must add validations of having nothing null etc
    const formData = new FormData();
    formData.append("recipePic", inputRef.current.files[0]);

    instance
      .post("/recipes", {
        ...recipe,
        steps: stepsArray.filter((item) => item !== "").join("___"),
      })
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
            .post("/check-new-recipe", {
              ...recipe,
              steps: stepsArray.filter((item) => item !== "").join("___"),
            })
            .then((result) => {
              instance
                .post(`/uploads/recipes/${result.data.id}`, formData)
                .catch((err) => console.error(err));
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .then(() => {
        instance
          .post("/check-new-recipe", {
            ...recipe,
            steps: stepsArray.filter((item) => item !== "").join("___"),
          })
          .then((result) => {
            navigate(`/recipes/${result.data.id}`);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch(() => console.warn("Une erreur est survenue!"));
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
