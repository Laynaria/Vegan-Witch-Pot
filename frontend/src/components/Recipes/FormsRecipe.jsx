import ThumbnailRecipe from "./ThumbnailRecipe";

import "./FormsRecipe.scss";

export default function FormsRecipe({ setRecipe, recipe }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  return (
    <section className="edit">
      <ThumbnailRecipe
        recipe={recipe}
        handleChange={handleChange}
        isEdit="true"
      />
      <form onChange={handleChange}>Yet to come.</form>
    </section>
  );
}
