import { useState, useEffect } from "react";
import instance from "@services/instance";
import "./ThumbnailRecipe.scss";

export default function FormsRecipe({ recipe, handleChange, isEdit = false }) {
  const [categories, setCategories] = useState([{ id: 1 }]);

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

      {isEdit ? (
        <label>
          Picture Link
          {/* should maybe change it to an input type link */}
          <input
            type="text"
            name="thumbnail"
            value={recipe.thumbnail}
            onChange={handleChange}
          />
        </label>
      ) : (
        ""
      )}
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

      <label>
        {isEdit ? "Difficulty" : "Difficulty"}
        <input
          type="range"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
          min={isEdit ? "1" : "0"}
          max="5"
        />
      </label>
    </form>
  );
}
