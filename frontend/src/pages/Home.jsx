import LastRecipes from "@components/Home/LastRecipes";
import Welcome from "@components/Home/Welcome";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Vegan Witch Pot";
  }, []);

  return (
    <>
      <Welcome />
      <LastRecipes />
    </>
  );
}
