import { useState, useEffect } from "react";
import instance from "@services/instance";
import RecipeCheckbox from "./RecipeCheckbox";

import "./ThumbnailRecipe.scss";

export default function FormsRecipe({
  recipe,
  setRecipe,
  handleChange,
  inputRef,
  setThumbnail,
  isEdit = false,
  isMyRecipes = false,
  setIsMyRecipes = false,
  userId = 0,
  handleResetFilter,
}) {
  const [categories, setCategories] = useState([{ id: 1 }]);
  // function to fill the input range difficulty color
  const getBackgroundSize = () => {
    if (isEdit) {
      return {
        backgroundSize: `${
          (parseInt(recipe.difficulty - 1, 10) * 100) / 4
        }% 100%`,
      };
    }
    return {
      backgroundSize: `${(parseInt(recipe.difficulty, 10) * 100) / 5}% 100%`,
    };
  };

  const handleChangeThumbnail = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/jpg" ||
      e.target.files[0].type === "image/png"
    ) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      setRecipe({ ...recipe, is_thumbnail: true });
    }
  };

  useEffect(() => {
    instance
      .get("/categories")
      .then((result) => {
        setCategories(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <form className="recipeForm">
      <label>
        {isEdit ? "Title" : "Search"}
        <input
          type={isEdit ? "text" : "search"}
          name="title"
          autoComplete="off"
          value={recipe.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Type
        <select
          name="category_id"
          onChange={handleChange}
          value={recipe.category_id}
        >
          {isEdit ? "" : <option value="0">All</option>}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        {isEdit ? "Cooking Time" : "Time"}
        <input
          type={isEdit ? "text" : "search"}
          className="cookingTime"
          name="cooking_time"
          autoComplete="off"
          value={recipe.cooking_time}
          onChange={handleChange}
        />
      </label>

      {isEdit ? (
        <label className="FileUploadLabel">
          Picture
          <p />
          <input
            type="file"
            name="thumbnail"
            accept="image/png, image/jpeg"
            onChange={handleChangeThumbnail}
            ref={inputRef}
          />
        </label>
      ) : (
        ""
      )}

      <label>
        {isEdit ? "Difficulty" : "Difficulty"}
        <input
          type="range"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
          style={getBackgroundSize()}
          min={isEdit ? "1" : "0"}
          max="5"
        />
      </label>

      {isEdit || userId === 0 ? (
        ""
      ) : (
        <RecipeCheckbox
          value={isMyRecipes}
          onChangeFunction={() => setIsMyRecipes(!isMyRecipes)}
        />
      )}

      {isEdit ? (
        ""
      ) : (
        <button type="button" onClick={handleResetFilter}>
          Reset Filters
        </button>
      )}
    </form>
  );
}
