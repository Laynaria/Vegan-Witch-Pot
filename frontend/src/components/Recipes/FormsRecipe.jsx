import ThumbnailRecipe from "./ThumbnailRecipe";

import "./FormsRecipe.scss";

export default function FormsRecipe({
  setRecipe,
  recipe,
  inputRef,
  setThumbnail,
  stepsArray,
  setStepsArray,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addToArray = (array, setArray) => {
    setArray([...array, ""]);
  };

  const editItemArray = (array, setArray, e, index) => {
    if (e.nativeEvent.inputType === "insertLineBreak") return;

    const newArray = array.map((item, i) => {
      if (index === i && !e.target.value.includes("_")) {
        return [`${e.target.value}`];
      }
      return item;
    });

    setArray(newArray);
  };

  const removeItemArray = (array, setArray, index) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <section className="edit">
      <ThumbnailRecipe
        recipe={recipe}
        setRecipe={setRecipe}
        inputRef={inputRef}
        setThumbnail={setThumbnail}
        handleChange={handleChange}
        isEdit="true"
      />
      <div>
        <form>Ingredients</form>
        <form>
          Steps
          {stepsArray.map((step, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <label key={index}>
              <p>{index + 1}.</p>
              <textarea
                type="text"
                value={step}
                // value={stepsArray[index]}
                onChange={(e) =>
                  editItemArray(stepsArray, setStepsArray, e, index)
                }
              />
              {index !== 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    removeItemArray(stepsArray, setStepsArray, index)
                  }
                >
                  -
                </button>
              ) : (
                ""
              )}
            </label>
          ))}
          <button
            type="button"
            onClick={() => addToArray(stepsArray, setStepsArray)}
          >
            +
          </button>
        </form>
      </div>
    </section>
  );
}
