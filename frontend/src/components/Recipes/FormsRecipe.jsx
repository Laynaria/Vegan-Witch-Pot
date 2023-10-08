import { useState, useEffect } from "react";
import instance from "@services/instance";
import ThumbnailRecipe from "./ThumbnailRecipe";

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
        { line: array.length + 1, value: "", name: "", type_id: 1 },
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

  const removeItemArray = (array, setArray, index) => {
    setArray(array.filter((item, i) => i !== index));
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

  // Ingredient object look
  //   {
  //     "id": 8,
  //     "line": 4,
  //     "recipe_id": 1,
  //     "ingredient_id": 4,
  //     "quantity_id": 86,
  //     "name": "Salt",
  //     "value": "",
  //     "type_id": 8,
  //     "type": "to taste",
  //     "unit": ""
  // }

  const editIngredient = (e, currentIndex) => {
    const { name, value } = e.target;

    const newIngredients = ingredients.map((ingredient, index) => {
      if (index === currentIndex && name === "type_id") {
        return {
          ...ingredient,
          type: types[value - 1].type,
          unit: types[value - 1].unit,
          value: value === "8" ? "" : ingredient.value,
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

  const registerIngredient = () => {
    ingredients.forEach((ingredient) => {
      if (ingredient.isEdit) {
        console.warn(ingredient);
      }
    });
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

              {index !== 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    removeItemArray(ingredients, setIngredients, index)
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
          <button type="button" onClick={() => registerIngredient()}>
            Test
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
                // value={stepsArray[index]}
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
        <label className="containerCheckbox">
          <p>Do you wish to share your recipes?</p>
          <input
            checked={recipe.is_shared ? "checked" : ""}
            type="checkbox"
            name="is_shared"
            value={recipe.is_shared}
            onChange={handleShare}
          />
          <svg
            viewBox="0 0 384 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="clipboard"
          >
            <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
          <svg
            viewBox="0 0 384 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="clipboard-check"
          >
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        </label>

        {user.role_id === 3 ||
        (user.role_id === 2 && user.id === recipe.user_id) ? (
          <label className="containerCheckbox">
            <p>Do you wish to approve this recipes?</p>
            <input
              checked={recipe.is_approved ? "checked" : ""}
              type="checkbox"
              name="is_approved"
              value={recipe.is_approved}
              onChange={handleApprove}
            />
            <svg
              viewBox="0 0 384 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="clipboard"
            >
              <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
            </svg>
            <svg
              viewBox="0 0 384 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="clipboard-check"
            >
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          </label>
        ) : (
          ""
        )}
      </form>
    </section>
  );
}
