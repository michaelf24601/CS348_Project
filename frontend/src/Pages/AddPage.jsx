import React, { useState } from "react";
import "../Styles/add.css"
import { requestService } from "../Services/requestService";

const AddPage = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
    const [formData, setFormData] = useState(initialFormData);

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

    const validateFormData = () => {
        return Object.values(formData).every(field => field.trim() !== "");
    };
    

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

        try {
            const request = {
                newIngredient: formData
            }
            const response = await requestService.addIngredient(request);
            setSuccessMessage("Ingredient Added!");
            setFormData(initialFormData);
        } catch (error) {
            const errmsg = requestService.getGenericErrorMessage(error);
            setErrorMessage(errmsg);
        }
    }

    return (
        <div className="addPage-container">
            <h1>Add ingredient</h1>
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
                {errorMessage ? <p className="errorText">{errorMessage}</p> : null}
                {successMessage ? <p className="successText">{successMessage}</p> : null}
                
            </form>
        </div>
    );
}

export default AddPage;