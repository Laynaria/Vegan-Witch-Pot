import { useState } from "react";
import Landing from "@components/Landing/Landing";

import Router from "./router/router";
import "./App.scss";

function App() {
  const [isLanding, setIsLanding] = useState(true);

  return (
    <>
      {isLanding ? (
        <main>
          <Landing setIsLanding={setIsLanding} />
        </main>
      ) : (
        <Router />
      )}
    </>
  );
}

export default App;
