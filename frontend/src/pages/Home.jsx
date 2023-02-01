import { useState } from "react";
import Landing from "@components/Home/Landing";

export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  return (
    <main>
      {isLanding ? <Landing setIsLanding={setIsLanding} /> : <p>HomePage</p>}
    </main>
  );
}
