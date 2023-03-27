import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "@services/instance";

import FormsRecipe from "@components/Recipes/FormsRecipe";
import Card from "@components/Card/Card";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";

import editIcon from "@assets/icons/wand.svg";
import deleteIcon from "@assets/icons/broom.svg";

import "@components/AddRecipe/AddRecipe.scss";

export default function EditRecipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState({
    thumbnail: "grilled_peas.png",
    title: "Grilled Peas",
    difficulty: 1,
    cooking_time: "3h",
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    // must add validations of having nothing null etc

    instance
      .put(`/recipes/${id}`, recipe)
      .then(() => navigate("/recipes"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleDelete = () => {
    instance
      .delete(`/recipes/${id}`)
      .then(() => navigate("/recipes"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  useEffect(() => {
    instance
      .get(`/recipes/${id}`)
      .then((result) => {
        setRecipe(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main id="flex-row">
      <FormsRecipe recipe={recipe} setRecipe={setRecipe} />
      <section className="preview">
        <h2>Preview</h2>
        <Card recipe={recipe} />

        <ButtonRecipe icon={editIcon} text="Edit" handleClick={handleSubmit} />

        <ButtonRecipe
          icon={deleteIcon}
          text="Delete"
          handleClick={handleDelete}
        />
      </section>
    </main>
  );
}
