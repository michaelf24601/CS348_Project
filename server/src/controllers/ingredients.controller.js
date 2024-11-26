/* ingredinets.controller.js server/src/controllers/ingredinets.controller.js */

import Ingredient from "../models/Ingredient.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.resolve(__dirname, "../../../database/main.db");
console.log("Database path:", databasePath);


const addIngredient = async (req, res) => {
    try {
        console.log("addIngredient call");
        const {
            ingredient_name,
            serving_size,
            serving_size_unit,
            carbs,
            sugar,
            fiber,
            fat,
            saturated_fat,
            polyunsaturated_fat,
            monounsaturated_fat,
            protein,
            date_added,
        } = req.body.newIngredient;

        const newIngredient = await Ingredient.create({
            ingredient_name,
            serving_size,
            serving_size_unit,
            carbs,
            sugar,
            fiber,
            fat,
            saturated_fat,
            polyunsaturated_fat,
            monounsaturated_fat,
            protein,
            date_added,
        }); //add ingredient
        
        res.status(200).json(newIngredient);
    } catch (error) {
        console.log("Error adding ingredientL:", error);
        res.status(500).json({error: "Failed to add ingredient to database."});
    }
};

const editIngredient = async (req, res) => {
    try {
        console.log("editIngredient call");
        const updatedData = req.body.updatedData;
        const ingredient_name = updatedData.ingredient_name;

        const db = await open({
            filename: databasePath,
            driver: sqlite3.Database,
        });

        const findQuery = "SELECT * FROM ingredients WHERE ingredient_name = ?";
        const ingredient = await db.get(findQuery, [ingredient_name]);

        if (!ingredient) {
            return res.status(404).json({error : "Ingredient not found"});
        }

        const updateQuery = `
            UPDATE ingredients
            SET serving_size = ?, serving_size_unit = ?, carbs = ?, sugar = ?, fiber = ?, fat = ?,
                saturated_fat = ?, polyunsaturated_fat = ?, monounsaturated_fat = ?, protein = ?
            WHERE ingredient_name = ?`;

        await db.run(updateQuery, [
            updatedData.serving_size,
            updatedData.serving_size_unit,
            updatedData.carbs,
            updatedData.sugar,
            updatedData.fiber,
            updatedData.fat,
            updatedData.saturated_fat,
            updatedData.polyunsaturated_fat,
            updatedData.monounsaturated_fat,
            updatedData.protein,
            ingredient_name,
        ]);

        //await ingredient.update(updatedData); //update ingredient

        res.status(200).json({message: "Ingredient updated successfully", ingredient});
    } catch (error) {
        console.log("Error editing ingredient:", error);
        res.status(500).json({error: "Failed to update database with edited ingredient."});
    }
};

const deleteIngredient = async (req, res) => {
    try {
        console.log("deleteIngredient call");
        const ingredient_name = req.body.ingredient_name

        const ingredient = await Ingredient.findOne({
            where: { ingredient_name },
        });

        if (!ingredient) {
            return res.status(404).json({error : "Ingredient not found"});
        }

        await ingredient.destroy(); //delete ingredient

        res.status(200).json({message: "Ingredient deleted successfully", ingredient});
    } catch (error) {
        console.log("Error deleting ingredientL:", error);
        res.status(500).json({error: "Failed to delete ingredient from database."});
    }
};

const getAllIngredients = async (req, res) => {
    try {
      const ingredients = await Ingredient.findAll(); 
      res.status(200).json(ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      res.status(500).json({ error: "Failed to retrieve ingredients" });
    }
  };
  

export default {
    addIngredient,
    editIngredient,
    deleteIngredient,
    getAllIngredients,
}