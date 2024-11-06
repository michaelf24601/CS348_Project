import React from "react";
import { Routes, Route } from "react-router-dom";

import MainNav from "./Components/MainNav";

import AddPage from "./Pages/AddPage";
import EditPage from "./Pages/EditPage";
import DeletePage from "./Pages/DeletePage";
import IngredientsPage from "./Pages/IngredientsPage";

function App() {
  return (
    <div>
      <MainNav />
      <Routes>
        <Route path="/" element={<AddPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
      </Routes>
    </div>
  );
}

export default App;