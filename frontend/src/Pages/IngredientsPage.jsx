import React from "react";
import "../Styles/ingredients.css"

const IngredientsPage = () => {

    return (
        <div className="ingredientsPage-container">
            <h1>Add ingredient</h1>
            <form>
            <label for="ingredient_name">Ingredient name:</label>
                <input 
                    type="text"
                    name="ingredient_name"
                    placeholder="Name"
                />
                <br />
                <label for="serving_size">Serving size:</label>
                <input 
                    type="number"
                    name="serving_size"
                    placeholder="Serving size"
                />
                <select name="serving_size_unit">
                    <option value="tbsp">Tbsp</option>
                    <option value="tsp">tps</option>
                    <option value="cups">Cup</option>
                    <option value="lbs">lbs</option>
                    <option value="oz">oz</option>
                    <option value="g">g</option>
                </select>
            </form>
        </div>
    );
}

export default IngredientsPage;