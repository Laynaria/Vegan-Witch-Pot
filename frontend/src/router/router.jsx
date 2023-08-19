import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout/Layout";

import Home from "@pages/Home";
import AboutUs from "@pages/AboutUs";
import Error from "@pages/Error";
import Recipes from "@pages/Recipes";
import RecipeId from "@pages/RecipeId";
import Contact from "@pages/Contact";

import LogIn from "@pages/LogIn";
import Register from "@pages/Register";
import Profile from "@pages/Profile";

import AddRecipe from "@pages/AddRecipe";
import EditRecipe from "@pages/EditRecipe";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/error-404" element={<Error />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeId />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
