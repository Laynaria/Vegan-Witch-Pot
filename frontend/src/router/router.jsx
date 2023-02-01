import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Error from "@pages/Error";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
