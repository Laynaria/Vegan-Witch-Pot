import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import demon from "@assets/lotties/demon_about_us.json";

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <>
      <h1>About Us</h1>
      <section>
        <h2>What is Vegan Witch Pot?</h2>
        <p>
          VWP is a community web app revolving around creating and sharing
          recipes.
        </p>
      </section>
      <section>
        <h2> </h2>
        <p> </p>
      </section>
      <section>
        <h2>Why is the Witch Vegan?</h2>
        <Player
          autoplay
          loop
          src={demon}
          className={isLoading ? "hide" : ""}
          style={{ transition: "opacity 1s ease" }}
        />
        <p>Firstly because</p>
      </section>
    </>
  );
}
