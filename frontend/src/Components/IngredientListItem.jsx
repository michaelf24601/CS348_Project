import React, { useState } from "react"
import "../Styles/ingredients.css"
import { requestService } from "../Services/requestService";

const IngredientListItem = ({ingredientData, editIngredient, setErrorMessage, setSuccessMessage}) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const deleteIngredient = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const request = {
                ingredient_id: ingredientData.ingredient_id
            }
            const response = await requestService.deleteIngredient(request);
            setSuccessMessage("Ingredient Deleted!");
        } catch (error) {
            console.error(error);
            const errmsg = requestService.getGenericErrorMessage(error);
            setErrorMessage(errmsg);
        }
    }

    return (
        <li className="ingredientsPage-ingredientListItem">
            <div className="ingredientsPage-ingredientListItem-contentContainer">
                <div className="ingredientsPage-ingredientListItem-header"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <span></span>
                    <p>{ingredientData.ingredient_name}</p>
                    <button
                        className="ingredientsPage-searchBarButton"
                        onClick={() => editIngredient(ingredientData)}
                    >Edit</button>
                    <button
                        className="ingredientsPage-searchBarButton"
                        onClick={() => deleteIngredient(ingredientData)}
                    >Delete</button>
                    <span></span>
                </div>
                <div 
                    className={`ingredientsPage-ingredientListItem-dropdownContainer ${
                        showDropdown ? "open" : "closed"
                    }`}
                >
                    <ul>
                        <li>
                            <h3>Name: </h3>
                            <p>{ingredientData.ingredient_name}</p>
                        </li>
                        <hr />
                        <li>
                            <h3>Serving Size: </h3>
                            <p>{ingredientData.serving_size}</p>
                            <p>{ingredientData.serving_size_unit}</p>
                        </li>
                        <hr />
                        <li>
                            <h3>Carbs: </h3>
                            <p>{ingredientData.carbs}</p>
                        </li>
                        <li>
                            <h3>Sugar: </h3>
                            <p>{ingredientData.sugar}</p>
                        </li>
                        <li>
                            <h3>Fiber: </h3>
                            <p>{ingredientData.fiber}</p>
                        </li>
                        <hr />
                        <li>
                            <h3>Fat: </h3>
                            <p>{ingredientData.fat}</p>
                        </li>
                        <li>
                            <h3>Saturated Fat: </h3>
                            <p>{ingredientData.saturated_fat}</p>
                        </li>
                        <li>
                            <h3>Polyunsaturated Fat: </h3>
                            <p>{ingredientData.polyunsaturated_fat}</p>
                        </li>
                        <li>
                            <h3>Monounsaturated Fat: </h3>
                            <p>{ingredientData.monounsaturated_fat}</p>
                        </li>
                        <hr />
                        <li>
                            <h3>Protein: </h3>
                            <p>{ingredientData.protein}</p>
                        </li>
                        <hr />
                        <li>
                            <h3>Date Added: </h3>
                            <p>{ingredientData.date_added}</p>
                        </li>
                        <li>
                            <h3>ID: </h3>
                            <p>{ingredientData.ingredient_id}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default IngredientListItem;