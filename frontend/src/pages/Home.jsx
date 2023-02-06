import { useState } from "react";
import Landing from "@components/Home/Landing";
import Layout from "@components/Layout/Layout";
import Recipes from "@components/Home/Recipes";

export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  return (
    <>
      {isLanding ? (
        <main>
          <Landing setIsLanding={setIsLanding} />
        </main>
      ) : (
        <Layout>
          <Recipes />
        </Layout>
      )}
    </>
  );
}
