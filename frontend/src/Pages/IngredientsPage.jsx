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
      <div className="ingredientsPage-halfSection">
        <div className="ingredientsPage-searchBarContainer"> 
          <input 
            type="text"
            className="ingredientsPage-searchBar"
          />
        </div>
      </div>
      <div className="ingredientsPage-halfSection">
        <p>test</p>
      </div>
      

      
    </div>
  );
};

export default IngredientsPage;
