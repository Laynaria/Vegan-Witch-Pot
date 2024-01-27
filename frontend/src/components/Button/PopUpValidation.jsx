import "./PopUpValidation.scss";

export default function PopUpValidation({
  handleClick,
  setIsPopUp,
  textValidation,
}) {
  const handleClickPlus = (e) => {
    setIsPopUp(false);
    handleClick(e);
  };

  return (
    <dialog className="PopUpValidation">
      <p className="PopUpText">
        <span className="PopUpSpan">
          Do you really want to {textValidation} ?
        </span>
        <button
          className="PopUpButton"
          type="button"
          onClick={(e) => handleClickPlus(e)}
        >
          Yes
        </button>
        <button
          className="PopUpButton"
          type="button"
          onClick={() => setIsPopUp(false)}
        >
          No
        </button>
      </p>
    </dialog>
  );
}
