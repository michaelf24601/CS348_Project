/* ingredinets.route.js server/src/routes/ingredinets.route.js */

import express from "express";
import ingredientsController from "../controllers/ingredients.controller.js";

const router = express.Router();

router.post("/add-ingredient", ingredientsController.addIngredient);
router.post("/edit-ingredient", ingredientsController.editIngredient);
router.post("/delete-ingredient", ingredientsController.deleteIngredient);
router.get("/get-all-ingredients", ingredientsController.getAllIngredients);

export default router;