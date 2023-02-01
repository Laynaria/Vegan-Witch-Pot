import { useState } from "react";
import Landing from "@components/Home/Landing";
import Recipes from "@components/Home/Recipes";

export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  return (
    <main>
      {isLanding ? <Landing setIsLanding={setIsLanding} /> : <Recipes />}
    </main>
  );
}
