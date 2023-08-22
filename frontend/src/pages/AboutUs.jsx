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
        <h2 className={isLoading ? "hide" : ""}>What is Vegan Witch Pot?</h2>
        <Player
          autoplay
          loop
          src={food}
          className={isLoading ? "hide" : ""}
          style={{ transition: "opacity 1s ease" }}
        />
        <p className={isLoading ? "hide" : ""}>
          VWP is a community web app revolving around creating and sharing
          recipes. Users can either create recipes for themselves or set them as
          accessible by the community.
        </p>
        <p className={isLoading ? "hide" : ""}>
          Users and unidentified users can then access all accessible recipes
          which were validated by admins. Only vegan recipes are accepted of
          course.
        </p>
        <p className={isLoading ? "hide" : ""}>
          Identified users will also be able to create their private weekly
          menus, helping themselves for meal planning and groceries.
        </p>
      </section>

      <section>
        <h2 className={isLoading ? "hide" : ""}>Who is the Witch?</h2>
        <Player
          autoplay
          loop
          speed={1.5}
          src={witch}
          className={isLoading ? "hide" : ""}
          style={{ transition: "opacity 1s ease" }}
        />
        <p className={isLoading ? "hide" : ""}>
          The Witch is a peculiar individual who chose to establish this project
          hoping for her minions to cook a bigger variety of dishes for her.
        </p>
        <p className={isLoading ? "hide" : ""}>
          And if in that process, it can help others to have an easier meal
          planning and more recipes diversity it's even better in her opinion.
        </p>
        <p className={isLoading ? "hide" : ""}>
          Other than that, it's a secret! {"<3"}
        </p>
      </section>

      <section>
        <h2 className={isLoading ? "hide" : ""}>Why is the Witch Vegan?</h2>
        <Player
          autoplay
          loop
          src={demon}
          className={isLoading ? "hide" : ""}
          style={{ transition: "opacity 1s ease" }}
        />
        <p className={isLoading ? "hide" : ""}>
          Everything started during an horrendous magic night where The Witch
          was brewing potions. That night everything changed for her.
        </p>
        <p className={isLoading ? "hide" : ""}>
          While preparing one of her potion, she ended up missing some
          ingredients: toad eyes. As always she went outside to trap some toads.
        </p>
        <p className={isLoading ? "hide" : ""}>
          Back home, just before starting her awful deed, her eyes met the ones
          of a toad. She always liked toads, which yes is a bit strange maybe
          but everyone is different and I'm not here to judge.
        </p>
        <p className={isLoading ? "hide" : ""}>
          And at this exact moment she decided: no more of this! Hopefully she
          loved to experiment things, and after months and months of trials, she
          finally found how to replace all animals in her potions and also in
          her dishes.
        </p>
        <p className={isLoading ? "hide" : ""}>
          And you know what? More animals means more minions for her! (And also
          less work!)
        </p>
      </section>
    </div>
  );
}
