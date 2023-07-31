import spoon from "@assets/icons/spoon.svg";
import sand from "@assets/icons/sand.svg";
import basicThumbnail from "@assets/recipes/mini/bowl.png";

import "./Card.scss";

export default function Card({
  recipe,
  thumbnail = recipe.is_thumbnail
    ? `${import.meta.env.VITE_BACKEND_URL}/uploads/recipes/${recipe.id}.png`
    : basicThumbnail,
}) {
  return (
    <div className="card">
      <img src={thumbnail} alt={recipe.title} className="card-img" />
      <h2>{recipe.title}</h2>
      <p>
        <span>
          {/* {recipe.difficulty} */}
          <img src={spoon} alt="Difficulty" />
          <img
            src={spoon}
            alt="Difficulty"
            className={recipe.difficulty >= 2 ? "" : "greyed-spoon"}
          />
          <img
            src={spoon}
            alt="Difficulty"
            className={recipe.difficulty >= 3 ? "" : "greyed-spoon"}
          />
          <img
            src={spoon}
            alt="Difficulty"
            className={recipe.difficulty >= 4 ? "" : "greyed-spoon"}
          />
          <img
            src={spoon}
            alt="Difficulty"
            className={recipe.difficulty >= 5 ? "" : "greyed-spoon"}
          />
        </span>
        <span>
          <img src={sand} alt="Time" />
          {recipe.cooking_time}
        </span>
      </p>
    </div>
  );
}
