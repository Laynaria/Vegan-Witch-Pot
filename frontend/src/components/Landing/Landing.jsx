import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import witch from "@assets/lotties/witch_home.json";
import logo from "@assets/logos/logo.svg";
import "./Landing.scss";

export default function Error({ setIsLanding }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLanding = () => {
    setIsLanding(false);
    localStorage.setItem(
      "landing_animation",
      JSON.stringify({ state: false, exp: Date.now() + 60000 * 60 * 24 })
    );
  };

  useEffect(() => {
    const getLanding = JSON.parse(localStorage.getItem("landing_animation"));

    setTimeout(() => {
      setIsLoading(false);

      if (getLanding && getLanding.exp > Date.now()) {
        return setIsLanding(false);
      }

      return localStorage.removeItem("landing_animation");
    }, 300);
  }, []);

  return (
    <section className={!isLoading ? "Landing" : "Landing hide"}>
      <Player autoplay loop speed={1.25} src={witch} className="WitchLottie" />

      <button
        type="button"
        className={!isLoading ? "" : "hide"}
        onClick={handleLanding}
      >
        Enter
      </button>
      <img src={logo} alt="logo" className="LogoLanding" />
    </section>
  );
}
