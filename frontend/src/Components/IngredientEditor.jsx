
import React, { useEffect, useState } from "react"
import "../Styles/ingredients.css"
import { requestService } from "../Services/requestService";

const IngredientEditor = ({editorMode, currentIngredient, closeEditor}) => {

    const initialFormData = {
        ingredient_name:"",
        serving_size:"",
        serving_size_unit:"",
        carbs:"",
        sugar:"",
        fiber:"",
        fat:"",
        saturated_fat:"",
        polyunsaturated_fat:"",
        monounsaturated_fat:"",
        protein:""
    }

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState(initialFormData);

    //effects

    useEffect(() => {
        //when the editor is opened, if it's in edit mode then populate fields
        if (editorMode === "edit") {
            const existingData = {
                ingredient_id: currentIngredient.ingredient_id,
                ingredient_name: currentIngredient.ingredient_name,
                serving_size: currentIngredient.serving_size,
                serving_size_unit: currentIngredient.serving_size_unit,
                carbs: currentIngredient.carbs,
                sugar: currentIngredient.sugar,
                fiber: currentIngredient.fiber,
                fat: currentIngredient.fat,
                saturated_fat: currentIngredient.saturated_fat,
                polyunsaturated_fat: currentIngredient.polyunsaturated_fat,
                monounsaturated_fat: currentIngredient.monounsaturated_fat,
                protein: currentIngredient.protein
            }
            setFormData(existingData);
        }
    }, [])

    //helpers

    const validateFormData = () => {
        return Object.values(formData).every(field => {
            if (field.toString().trim() === "") return false;
            return true;
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (validateFormData()) {
            setErrorMessage("");
        }
    }

    //requests

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        console.log(formData);
        console.log(validateFormData());

        if (!validateFormData()) {
            setErrorMessage("All form fields must be full.");
            return;
        }

        //either add or edit depending on mode

        if (editorMode === "edit") {
            try {
                const request = {
                    updatedData: formData
                }
                const response = await requestService.editIngredient(request);
                setSuccessMessage("Ingredient Edited!");
                setFormData(initialFormData);
                //potentially problem here. Don't want to allow re-submit after edit
            } catch (error) {
                const status = error.response?.status;
                if (status === 400) {
                    setErrorMessage("Cannot change name because another ingredient already has that name.");
                    return;
                }
                const errmsg = requestService.getGenericErrorMessage(error);
                setErrorMessage(errmsg);
            }
        } else if (editorMode === "add") {
            try {
                const request = {
                    newIngredient: formData
                }
                const response = await requestService.addIngredient(request);
                setSuccessMessage("Ingredient Added!");
                setFormData(initialFormData);
            } catch (error) {
                const status = error.response?.status;
                if (status === 400) {
                    setErrorMessage("Another ingredient already exists with that name. There cannot be duplicates.");
                    return;
                }
                const errmsg = requestService.getGenericErrorMessage(error);
                setErrorMessage(errmsg);
            }
        } else {
            setErrorMessage("Internal Error: Unknown editor mode. Unable to proceed.");
        }
    }

    return (
        <div className="ingredientsPage-editorContainer">
            <div className="ingredientsPage-editorContentContainer">
                <div className="ingredientsPage-editorTitleContainer">
                    <h2>{editorMode === "add"? "Add" : "Edit"} Ingredient</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="ingredient_name">Ingredient name:</label>
                    <input 
                        type="text"
                        name="ingredient_name"
                        placeholder="Name"
                        value={formData.ingredient_name}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="serving_size">Serving size:</label>
                    <input 
                        type="number"
                        name="serving_size"
                        placeholder="Serving size"
                        value={formData.serving_size}
                        onChange={handleChange}
                    />
                    <select 
                        name="serving_size_unit"
                        value={formData.serving_size_unit}
                        onChange={handleChange}
                    >
                        <option value="">Select Unit</option>
                        <option value="tbsp">Tbsp</option>
                        <option value="tsp">tsp</option>
                        <option value="cups">Cup</option>
                        <option value="lbs">lbs</option>
                        <option value="oz">oz</option>
                        <option value="g">g</option>
                    </select>
                    <br />
                    <h2>Macros</h2>
                    <label htmlFor="carbs">Carbs:</label>
                    <input 
                        type="number"
                        name="carbs"
                        placeholder="grams"
                        value={formData.carbs}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="sugar">Sugar:</label>
                    <input 
                        type="number"
                        name="sugar"
                        placeholder="grams"
                        value={formData.sugar}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="fiber">Fiber:</label>
                    <input 
                        type="number"
                        name="fiber"
                        placeholder="grams"
                        value={formData.fiber}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="fat">Fat:</label>
                    <input 
                        type="number"
                        name="fat"
                        placeholder="grams"
                        value={formData.fat}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="saturated_fat">Saturated Fat:</label>
                    <input 
                        type="number"
                        name="saturated_fat"
                        placeholder="grams"
                        value={formData.saturated_fat}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="polyunsaturated_fat">Polyunsaturated Fat:</label>
                    <input 
                        type="number"
                        name="polyunsaturated_fat"
                        placeholder="grams"
                        value={formData.polyunsaturated_fat}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="monounsaturated_fat">Monounsaturated Fat:</label>
                    <input 
                        type="number"
                        name="monounsaturated_fat"
                        placeholder="grams"
                        value={formData.monounsaturated_fat}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="protein">Protein:</label>
                    <input 
                        type="number"
                        name="protein"
                        placeholder="grams"
                        value={formData.protein}
                        onChange={handleChange}
                    />
                    <br />
                    <button type="submit">Submit</button>
                    <button
                        onClick={()=> closeEditor()}
                    >Close</button>
                    {errorMessage ? <p className="errorText">{errorMessage}</p> : null}
                    {successMessage ? <p className="successText">{successMessage}</p> : null}
                </form>
            </div>
        </div>
    )
}
export default IngredientEditor;