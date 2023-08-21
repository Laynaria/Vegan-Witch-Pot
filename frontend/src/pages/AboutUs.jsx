import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import food from "@assets/lotties/food_about_us.json";
import witch from "@assets/lotties/witch_about_us.json";
import demon from "@assets/lotties/demon_about_us.json";

import "@components/AboutUs/AboutUs.scss";

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <div className="AboutUs">
      <h1 className={isLoading ? "hide" : ""}>About Us</h1>
      <section>
        <h2>What is Vegan Witch Pot?</h2>
        <Player
          autoplay
          loop
          src={food}
          className={isLoading ? "hide" : ""}
          style={{ transition: "opacity 1s ease" }}
        />
        <p>
          VWP is a community web app revolving around creating and sharing
          recipes. Users can either create recipes for themselves or set them as
          accessible by the community.
        </p>
        <p>
          Users and unidentified users can then access all accessible recipes
          which were validated by admins. Only vegan recipes are accepted of
          course.
        </p>
        <p>
          Identified users will also be able to create their private weekly
          menus, helping themselves for food planification and groceries.
        </p>
      </section>

      <section>
        <h2>Who is the Witch?</h2>
        <Player
          autoplay
          loop
          speed={1.5}
          src={witch}
          className={isLoading ? "hide" : ""}
          style={{ transition: "opacity 1s ease" }}
        />
        <p>It's a secret! {"<3"}</p>
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
        <p>Firstly because she doesn't like animals to suffer.</p>
        <p>But mainly because more animals means more minions to her!</p>
      </section>
    </div>
  );
}
