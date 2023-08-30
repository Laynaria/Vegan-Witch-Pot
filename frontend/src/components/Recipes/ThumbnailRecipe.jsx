import { useState, useEffect } from "react";
import instance from "@services/instance";

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
        <label className="containerCheckbox">
          My Recipes
          <input
            type="checkbox"
            value={isMyRecipes}
            onClick={() => setIsMyRecipes(!isMyRecipes)}
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
      )}
    </form>
  );
}
