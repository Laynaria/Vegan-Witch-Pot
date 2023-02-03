import "./ButtonRecipe.scss";

export default function ButtonRecipe({ handleClick, icon, text }) {
  return (
    <button type="button" className="recipe-button" onClick={handleClick}>
      <img src={icon} alt="add recipe icon" /> {text}
    </button>
  );
}
