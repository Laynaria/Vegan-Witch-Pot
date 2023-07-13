import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import instance from "@services/instance";

import FormsRecipe from "@components/Recipes/FormsRecipe";
import Card from "@components/Card/Card";
import ButtonRecipe from "@components/Recipes/ButtonRecipe";

import buttonIcon from "@assets/logos/logo_mini.svg";

import "@components/Recipes/AddRecipe.scss";

export default function AddRecipe() {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    thumbnail: "grilled_peas.png",
    title: "Grilled Peas",
    difficulty: 1,
    cooking_time: "3h",
    user_id: user.id,
    // Waiting their form inputs
    is_shared: 1,
    is_approved: 1,
    origin: "",
    steps: "",
    category_id: 4,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user.id === undefined) {
        navigate("/login");
      }
      setIsLoading(false);
    }, 100);
  }, []);

  const handleSubmit = () => {
    // must add validations of having nothing null etc

    instance
      .post("/recipes", recipe)
      .then(() => navigate("/recipes"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  return (
    <main className={isLoading ? "hide" : "flex-row"}>
      <FormsRecipe recipe={recipe} setRecipe={setRecipe} />
      <section className="preview">
        <h2>Preview</h2>
        <Card recipe={recipe} />

        <ButtonRecipe
          icon={buttonIcon}
          text="Add recipe"
          handleClick={handleSubmit}
        />
      </section>
    </main>
  );
}
