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
    <div className="PopUpValidation">
      <p>
        <span>Do you really want to {textValidation} ?</span>
        <button type="button" onClick={(e) => handleClickPlus(e)}>
          Yes
        </button>
        <button type="button" onClick={() => setIsPopUp(false)}>
          No
        </button>
      </p>
    </div>
  );
}
