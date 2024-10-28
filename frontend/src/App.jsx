import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import MainNav from "./Components/MainNav";
import IngredientsPage from "./Pages/IngredientsPage";
import RecipesPage from "./Pages/RecipesPage";

function App() {
  return (
    <div>
      <MainNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
    </div>
  );
}

export default App;