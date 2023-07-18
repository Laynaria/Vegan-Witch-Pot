import { useEffect, useState } from "react";

import "./CookiesPopUp.scss";

export default function Error({ setIsCookiesPopUpShown }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleCookiesPopUp = () => {
    setIsLoading(true);
    localStorage.setItem("cookies_pop_up", JSON.stringify({ state: false }));
    setTimeout(() => {
      setIsCookiesPopUpShown(false);
    }, 750);
  };

  useEffect(() => {
    const getPopUpInfo = JSON.parse(localStorage.getItem("cookies_pop_up"));

    setTimeout(() => {
      setIsLoading(false);

      if (getPopUpInfo && getPopUpInfo.state === false) {
        setIsCookiesPopUpShown(false);
      }
    }, 300);
  }, []);

  return (
    <section className={!isLoading ? "CookiesPopUp" : "CookiesPopUp hide"}>
      <p>
        We use some cookies crumbs for your magic experience. Only functionnal
        ones of course.
      </p>
      <button
        type="button"
        className={!isLoading ? "" : "hide"}
        onClick={handleCookiesPopUp}
      >
        Munch It!
      </button>
    </section>
  );
}
