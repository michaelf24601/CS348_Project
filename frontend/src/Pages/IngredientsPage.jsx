import React, { useState, useEffect } from "react";
import { requestService } from "../Services/requestService";
import "../Styles/ingredients.css"
import IngredientListItem from "../Components/IngredientListItem";
import IngredientEditor from "../Components/IngredientEditor";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editorMode, setEditorMode] = useState("add"); //add or edit

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //effects

  useEffect(() => {
    // Fetch all ingredients when the component loads
    fetchAllIngredients();
  }, []);

  //Requests

  const fetchAllIngredients = async () => {
    try {
        const response = await requestService.getAllIngredients(); //list of ingredient objects
        console.log(response.data);
        setIngredients(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  /*
    Query the database for any ingredients containing the keyword
  */
 /*
  const searchSubmit = async (e) => {
    e.preventDefault();

    try {
      //make request to search

      //populate search items

      //clear search bar
      console.log(searchTerm);
      setSearchTerm("");
    } catch (error) {
      console.error(error);
    }
  }
  */

  //helpers

  /*
    Called by an ingredient component when the user clicks edit
  */
  const editIngredient = (ingredientObj) => {
    setCurrentIngredient(ingredientObj);
    setEditorMode("edit");
    setShowEditor(true);
  }

  /*
    Called by the editor after it closes. Re-fetches the new data that's been
    presumably edited
  */
  const closeEditor = () => {
    fetchAllIngredients();
    setShowEditor(false);
  }

  /*
    Called when the user clicks the add ingredient button
  */
  const addIngredient = () => {
    setCurrentIngredient(null);
    setEditorMode("add");
    setShowEditor(true);
  }

  /* Called by an ingredient list item component when the user clicks delete */
  const deleteIngredient = async (ingredientObj) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
        const request = {
            ingredient_id: ingredientObj.ingredient_id
        }
        const response = await requestService.deleteIngredient(request);
        await fetchAllIngredients();
        setSuccessMessage("Ingredient Deleted!");
    } catch (error) {
        console.error(error);
        const errmsg = requestService.getGenericErrorMessage(error);
        setErrorMessage(errmsg);
    }
}

  //component builders

  /*
    Derived subset of ingredients based on search term
  */
  const filteredIngredients = ingredients.filter((ingredientObj) => 
    ingredientObj.ingredient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*
    Map each ingredient object in ingredients onto a list item
  */
  const listItemComponents = () => {
    const items = filteredIngredients.map((ingredientObj) => {
      return (
        <IngredientListItem 
          key={ingredientObj.ingredient_id}
          ingredientData={ingredientObj}
          editIngredient={editIngredient}
          deleteIngredient={deleteIngredient}
        />
      )
    });
    return items;
  }


  //rendering

  return (
    <div className="ingredientsPage-container">
      {showEditor ? 
      <IngredientEditor 
        closeEditor={closeEditor}
        currentIngredient={currentIngredient}
        editorMode={editorMode}
      />
      : null}
      <div className="ingredientsPage-contentContainer">
        <div className="ingredientsPage-searchBarSectionContainer"> 
          <div className="ingredientsPage-searchBarContainer">
            <input 
              type="text"
              className="ingredientsPage-searchBar"
              placeholder="Enter search term..."
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
            {/*
            <button
              className="ingredientsPage-searchBarButton"
              onClick={(e) => searchSubmit(e)}
              value={searchTerm}
              
            >
              Search
            </button>
            */}
          </div>
              
        </div>
        <div className="ingredientsPage-searchResultsSectionContainer">
          <ul className="ingredientsPage-ingredientList">
            {listItemComponents()}
          </ul>
        </div>
        <div className="ingredientsPage-footerSectionContainer">
          <button
            className="ingredientsPage-searchBarButton"
            onClick={() => addIngredient()}
          >
            Add New Ingredient
          </button>
          {errorMessage ? <p className="errorText">{errorMessage}</p> : null}
          {successMessage ? <p className="successText">{successMessage}</p> : null}
        </div>
        
      </div>

    </div>
  );
};

export default IngredientsPage;
