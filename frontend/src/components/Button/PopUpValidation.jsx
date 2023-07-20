import "./PopUpValidation.scss";

export default function PopUpValidation({
  handleClick,
  setIsPopUp,
  textValidation,
}) {
  const handleClickPlus = () => {
    setIsPopUp(false);
    handleClick();
  };

  return (
    <div className="PopUpValidation">
      <p>
        <span>Do you really want to {textValidation} ?</span>
        <button type="button" onClick={handleClickPlus}>
          Yes
        </button>
        <button type="button" onClick={() => setIsPopUp(false)}>
          No
        </button>
      </p>
    </div>
  );
}
