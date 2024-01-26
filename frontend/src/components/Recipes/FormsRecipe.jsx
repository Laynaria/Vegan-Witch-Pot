import { useState, useEffect } from "react";
import instance from "@services/instance";
import ThumbnailRecipe from "./ThumbnailRecipe";
import RecipeCheckbox from "./RecipeCheckbox";

import "./FormsRecipe.scss";

export default function FormsRecipe({
  user,
  setRecipe,
  recipe,
  inputRef,
  setThumbnail,
  stepsArray,
  setStepsArray,
  ingredients,
  setIngredients,
}) {
  const [types, setTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addToArray = (array, setArray, object = false) => {
    if (object === true) {
      return setArray([
        ...array,
        {
          line: array.length + 1,
          value: "",
          name: "",
          type_id: 1,
          isEdit: true,
        },
      ]);
    }
    return setArray([...array, ""]);
  };

  const editItemArray = (array, setArray, e, index) => {
    if (e.nativeEvent.inputType === "insertLineBreak") return;

    const newArray = array.map((item, i) => {
      if (index === i && !e.target.value.includes("_")) {
        return [`${e.target.value}`];
      }
      return item;
    });

    setArray(newArray);
  };

  const removeItemArray = (array, setArray, index, object = false) => {
    if (object === true) {
      return setArray(
        array
          .filter((item, i) => i !== index)
          .map((ingredient, id) => {
            return { ...ingredient, line: id + 1, isEdit: true };
          })
      );
    }

    return setArray(array.filter((item, i) => i !== index));
  };

  const handleShare = () => {
    setRecipe({ ...recipe, is_shared: !recipe.is_shared });
  };

  const handleApprove = () => {
    setRecipe({ ...recipe, is_approved: !recipe.is_approved });
  };

  useEffect(() => {
    instance
      .get("/type")
      .then((result) => {
        setTypes(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const editIngredient = (e, currentIndex) => {
    const { name, value } = e.target;

    const newIngredients = ingredients.map((ingredient, index) => {
      if (index === currentIndex && name === "type_id") {
        return {
          ...ingredient,
          type: types[value - 1].type,
          unit: types[value - 1].unit,
          value: value === "8" ? "0" : ingredient.value,
          isEdit: true,
          [name]: value,
        };
      }

      if (index === currentIndex) {
        return { ...ingredient, isEdit: true, [name]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  return (
    <section className="edit">
      <ThumbnailRecipe
        recipe={recipe}
        setRecipe={setRecipe}
        inputRef={inputRef}
        setThumbnail={setThumbnail}
        handleChange={handleChange}
        isEdit="true"
      />
      <div>
        <form className="ingredientForm">
          Ingredients
          {ingredients.map((ingredient, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={index}>
              <span>{ingredient.line}.</span>
              {ingredient.type !== "to taste" ? (
                <label>
                  Value:
                  <input
                    type="text"
                    name="value"
                    autoComplete="off"
                    value={ingredient.value}
                    onChange={(e) => editIngredient(e, index)}
                  />
                </label>
              ) : (
                <span />
              )}

              <label>
                Type:
                <select
                  name="type_id"
                  value={ingredient.type_id}
                  onChange={(e) => editIngredient(e, index)}
                >
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={ingredient.name}
                  onChange={(e) => editIngredient(e, index)}
                />
              </label>

              {ingredients.length !== 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    removeItemArray(ingredients, setIngredients, index, true)
                  }
                >
                  -
                </button>
              ) : (
                <button type="button" className="hidden">
                  -
                </button>
              )}
            </p>
          ))}
          <button
            type="button"
            onClick={() => addToArray(ingredients, setIngredients, true)}
          >
            +
          </button>
        </form>
        <form>
          Steps
          {stepsArray.map((step, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <label key={index}>
              <p>{index + 1}.</p>
              <textarea
                type="text"
                value={step}
                name={`step${index}`}
                autoComplete="off"
                onChange={(e) =>
                  editItemArray(stepsArray, setStepsArray, e, index)
                }
              />
              {index !== 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    removeItemArray(stepsArray, setStepsArray, index)
                  }
                >
                  -
                </button>
              ) : (
                ""
              )}
            </label>
          ))}
          <button
            type="button"
            onClick={() => addToArray(stepsArray, setStepsArray)}
          >
            +
          </button>
        </form>
      </div>

      <form className="ShareAndApprove">
        <RecipeCheckbox
          value={recipe.is_shared}
          onChangeFunction={handleShare}
          paragraphContent="Do you wish to share this recipes?"
        />

        {user.role_id === 3 ||
        (user.role_id === 2 && user.id === recipe.user_id) ? (
          <RecipeCheckbox
            value={recipe.is_approved}
            onChangeFunction={handleApprove}
            paragraphContent="Do you wish to approve this recipes?"
          />
        ) : (
          ""
        )}
      </form>
    </section>
  );
}
