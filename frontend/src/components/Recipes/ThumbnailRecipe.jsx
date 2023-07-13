import { useState, useEffect } from "react";
import instance from "@services/instance";
import "./ThumbnailRecipe.scss";

export default function FormsRecipe({ recipe, handleChange, isEdit = false }) {
  const [categories, setCategories] = useState([{}]);

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
    <form>
      <label>
        {isEdit ? "Title" : "Search"}
        <input
          type={isEdit ? "text" : "search"}
          name="title"
          defaultValue={recipe.title}
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
            defaultValue={recipe.thumbnail}
            onChange={handleChange}
          />
        </label>
      ) : (
        ""
      )}
      <label>
        Type
        <select name="category" onChange={handleChange}>
          <option defaultValue="All">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Difficulty
        <input
          type="range"
          name="difficulty"
          defaultValue={recipe.difficulty}
          onChange={handleChange}
          min="1"
          max="5"
        />
      </label>

      <label>
        {isEdit ? "Cooking Time" : "Time"}
        <input
          type="text"
          name="cooking_time"
          defaultValue={recipe.cooking_time}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}