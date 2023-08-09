import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import cat from "@assets/lotties/cat_welcome.json";

import "@components/Home/Welcome.scss";

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);
  return (
    <section className="Welcome">
      <h1 className={isLoading ? "hide" : ""}>Welcome to Vegan Witch Pot</h1>
      <Player
        autoplay
        loop
        src={cat}
        className={isLoading ? "hide" : ""}
        style={{ transition: "opacity 0.55s ease" }}
      />
      <p>May your dishes taste demonicaly good!</p>
    </section>
  );
}
