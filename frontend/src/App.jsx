import { useState } from "react";
import Landing from "@components/Home/Landing";

import Router from "./router/router";
import "./App.scss";

function App() {
  const [isLanding, setIsLanding] = useState(true);

  // AuthExport.handleAuth();

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
