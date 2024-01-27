import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import avocado from "@assets/lotties/avocado_error.json";

export default function Error() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  useEffect(() => {
    document.title = "Error - Vegan Witch Pot";
  }, []);

  return (
    <>
      <Player
        autoplay
        loop
        src={avocado}
        className={isLoading ? "hide" : ""}
        style={{ maxWidth: "95vw", transition: "opacity 0.55s ease" }}
      />
      <p
        className={isLoading ? "hide" : ""}
        style={{
          fontSize: "1.6rem",
          maxWidth: "95vw",
          textAlign: "center",
          transition: "opacity 0.55s ease",
          transitionDelay: "0.1s",
        }}
      >
        You lost your way, like this little magic avocado.
      </p>
      <p
        className={isLoading ? "hide" : ""}
        style={{
          fontSize: "1.6rem",
          maxWidth: "95vw",
          marginBottom: "4rem",
          textAlign: "center",
          transition: "opacity 0.55s ease",
          transitionDelay: "0.1s",
        }}
      >
        You should maybe think about getting back to somewhere the witch wants
        you...
      </p>
    </>
  );
}
