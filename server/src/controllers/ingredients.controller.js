/* ingredinets.controller.js server/src/controllers/ingredinets.controller.js */

import Ingredient from "../models/Ingredient.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import { getSequelize, getSQLite } from "../../db/db.js";
import { Sequelize } from "sequelize";


const addIngredient = async (req, res) => {
    try {
        const transaction = await Ingredient.sequelize.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });

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

        //check if an ingredient with the name already exists. We don't want two ingredients of the same name in the database
        const existingIngredient = await Ingredient.findOne({
            where: { ingredient_name }, transaction
        });

        if (existingIngredient) {
            return res.status(400).json({
                error: "An ingredient with this name already exists."
            });
        }

        //add the new ingredient

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
        }, { transaction }); 

        //commit the transaction if everything is fine
        await transaction.commit();

        res.status(200).json(newIngredient);
    } catch (error) {
        console.log("Error adding ingredient:", error);
        await transaction.rollback(); //roll back the transaction if therre's a problem
        res.status(500).json({error: "Failed to add ingredient to database."});
    }
};

const editIngredient = async (req, res) => {
    try {
        console.log("editIngredient call");

        const updatedData = req.body.updatedData;

        const db = await getSQLite();

        //begin transaction
        await db.exec("BEGIN TRANSACTION;");

        //check if an another ingredient with the name already exists (cannot change name to one that already exists)
        const existingQuery = "SELECT ingredient_name FROM ingredients WHERE ingredient_name = ? AND ingredient_id != ?"
        const existingIngredient = await db.get(existingQuery, [updatedData.ingredient_name, updatedData.ingredient_id])

        if (existingIngredient) {
            return res.status(400).json({error: "An ingredient already exists with that name"});
        }

        //find the ingredient by ID
        const findQuery = "SELECT * FROM ingredients WHERE ingredient_id = ?";
        const ingredient = await db.get(findQuery, [updatedData.ingredient_id]);

        if (!ingredient) {
            return res.status(404).json({error : "Ingredient not found"});
        }

        //update the ingredient
        const updateQuery = `
            UPDATE ingredients
            SET ingredient_name = ?, serving_size = ?, serving_size_unit = ?, carbs = ?, sugar = ?, 
                fiber = ?, fat = ?, saturated_fat = ?, polyunsaturated_fat = ?, 
                monounsaturated_fat = ?, protein = ?
            WHERE ingredient_id = ?`;

        await db.run(updateQuery, [
            updatedData.ingredient_name,
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
            updatedData.ingredient_id,
        ]);

        //commit the transaction
        await db.exec("COMMIT;");

        res.status(200).json({message: "Ingredient updated successfully"});
    } catch (error) {
        console.log("Error editing ingredient:", error);
        await db.exec("ROLLBACK"); //rollback the transaction if there was an error
        res.status(500).json({error: "Failed to update database with edited ingredient."});
    }
};

const deleteIngredient = async (req, res) => {
    try {
        console.log("deleteIngredient call");

        const transaction = await Ingredient.sequelize.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });

        const ingredient_id = req.body.ingredient_id;

        const ingredient = await Ingredient.findOne({
            where: { ingredient_id }, transaction
        });

        if (!ingredient) {
            return res.status(404).json({error : "Ingredient not found"});
        }

        await ingredient.destroy({ transaction }); //delete ingredient

        //commit the transaction
        await transaction.commit();

        res.status(200).json({message: "Ingredient deleted successfully", ingredient});
    } catch (error) {
        console.log("Error deleting ingredientL:", error);
        await transaction.rollback(); //roll back in the case of an error
        res.status(500).json({error: "Failed to delete ingredient from database."});
    }
};

const getAllIngredients = async (req, res) => {
    try {
        console.log("recieved request for all ingredients");
        
        const transaction = await Ingredient.sequelize.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED, // or REPEATABLE_READ
        });
        const ingredients = await Ingredient.findAll({ transaction }); 

        //commit the transaction if everything goes well
        await transaction.commit();

        res.status(200).json(ingredients);
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        await transaction.rollback(); //rollback if there's a problem
        res.status(500).json({ error: "Failed to retrieve ingredients" });
    }
  };
  

export default {
    addIngredient,
    editIngredient,
    deleteIngredient,
    getAllIngredients,
}