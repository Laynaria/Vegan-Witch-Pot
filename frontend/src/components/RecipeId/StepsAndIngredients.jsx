import { useState } from "react";

export default function StepsAndIngredients({ text }) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <span
      className={isChecked ? "checked" : ""}
      onClick={() => setIsChecked(!isChecked)}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
