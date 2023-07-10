import "./FormsRecipe.scss";

export default function FormsRecipe({ setRecipe, recipe }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  return (
    <section className="edit">
      <form>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
        </label>
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
        <label>
          Difficulty
          <input
            type="range"
            name="difficulty"
            value={recipe.difficulty}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </label>
        <label>
          Cooking Time
          <input
            type="text"
            name="cooking_time"
            value={recipe.cooking_time}
            onChange={handleChange}
          />
        </label>
      </form>
      <form onChange={handleChange}>Yet to come.</form>
    </section>
  );
}
