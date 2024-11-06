import React, { useState } from "react";
import "../Styles/delete.css"
import { requestService } from "../Services/requestService";

const DeletePage = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const initialFormData = {
        ingredient_name:""
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
            const response = await requestService.deleteIngredient(formData);
            setSuccessMessage("Ingredient Deleted!");
            setFormData(initialFormData);

        } catch (error) {
            const errmsg = requestService.getGenericErrorMessage(error);
            setErrorMessage(errmsg);
        }
    }

    return (
        <div className="deletePage-container">
            <h1>Delete ingredient</h1>
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
                <button type="submit">Submit</button>
                {errorMessage ? <p className="errorText">{errorMessage}</p> : null}
                {successMessage ? <p className="successText">{successMessage}</p> : null}
                
            </form>
        </div>
    );
}

export default DeletePage;