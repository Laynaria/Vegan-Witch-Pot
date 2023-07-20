import { useState } from "react";
import PopUpValidation from "./PopUpValidation";
import "./ButtonRecipe.scss";

export default function ButtonRecipe({
  handleClick,
  icon,
  text,
  hassPopUp = false,
  textValidation = "",
}) {
  const [isPopUp, setIsPopUp] = useState(false);

  return (
    <>
      <button
        type="button"
        className="recipe-button"
        onClick={(e) => (hassPopUp ? setIsPopUp(true) : handleClick(e))}
      >
        <img src={icon} alt="add recipe icon" /> {text}
      </button>
      {isPopUp ? (
        <PopUpValidation
          handleClick={handleClick}
          setIsPopUp={setIsPopUp}
          textValidation={textValidation}
        />
      ) : (
        ""
      )}
    </>
  );
}
