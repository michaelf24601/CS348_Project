import React, { useState, useEffect } from "react";
import { requestService } from "../Services/requestService";
import "../Styles/ingredients.css"

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // Fetch all ingredients when the component loads
    fetchAllIngredients();
  }, []);

  const fetchAllIngredients = async () => {
    try {
        const response = await requestService.getAllIngredients(); //list of ingredients
        console.log(response.data);
        setIngredients(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="ingredientsPage-container">
      <h2>Ingredients List</h2>
      <ul className="ingredientsPage-ingredientList">
        {ingredients.map((ingredient) => (
          <li key={ingredient.ingredient_id} className="ingredientListItem">
            {ingredient.ingredient_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsPage;
