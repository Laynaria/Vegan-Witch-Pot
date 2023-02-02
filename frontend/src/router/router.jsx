import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Layout from "@components/Layout/Layout";

import Error from "@pages/Error";
import Recipes from "@components/Home/Recipes";
import AddRecipe from "@pages/AddRecipe";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="*" element={<Error />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
