// import { useState, useEffect } from "react";
// import instance from "@services/instance";
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addToArray = (array, setArray) => {
    setArray([...array, ""]);
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

  // useEffect(() => {
  //   instance
  //     .get("/categories")
  //     .then((result) => {
  //       setCategories(result.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

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

  console.warn(setIngredients);

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
        <form>
          Ingredients
          {ingredients.map((ingredient, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={index}>
              <label>{ingredient.name}</label>
              <label>{ingredient.unit}</label>
              <label>{ingredient.value}</label>
              <label>{ingredient.type}</label>
              <label>{ingredient.line}</label>
            </p>
            // à changer : peut être qu'on va se retrouver avec des forms dans un form.
            // ou alors avec un p englobant des label >input
          ))}
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
