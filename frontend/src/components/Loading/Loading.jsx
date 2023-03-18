import { Player } from "@lottiefiles/react-lottie-player";
import loading from "@assets/lotties/loading_cook.json";
import { useState } from "react";

export default function Loading() {
  const loadArray = ["", ".", ".."];
  const [loadCount, setLoadCount] = useState(0);
  setTimeout(() => {
    if (loadCount !== 2) {
      return setLoadCount(loadCount + 1);
    }
    return setLoadCount(0);
  }, 800);
  return (
    <>
      <Player autoplay loop src={loading} style={{ marginBottom: "5rem" }} />
      <p style={{ width: "132px" }}>Loading.{loadArray[loadCount]}</p>
    </>
  );
}
