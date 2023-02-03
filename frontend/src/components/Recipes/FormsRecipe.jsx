import "./FormsRecipe.scss";

export default function FormsRecipe({ setRecipe, recipe }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  return (
    <section className="edit">
      <form onChange={handleChange}>
        <label>
          Title
          <input type="text" name="title" value={recipe.title} />
        </label>
        <label>
          Picture Link
          {/* should maybe change it to an input type link */}
          <input type="text" name="picture" value={recipe.picture} />
        </label>
        <label>
          Difficulty
          <input
            type="range"
            name="difficulty"
            value={recipe.difficulty}
            min="1"
            max="5"
          />
        </label>
        <label>
          Cooking Time
          <input type="text" name="cooking_time" value={recipe.cooking_time} />
        </label>
      </form>
      <form onChange={handleChange}>Yet to come.</form>
    </section>
  );
}
