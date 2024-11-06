/*app.js server/app.js */

import express from "express";
import cors from "cors";
import testRoute from "./src/routes/test.route.js";
import ingredientsRoute from "./src/routes/ingredients.route.js";
import IngredientModel from "./src/models/Ingredient.js";

const app = express();
const PORT = 8080;

app.use(cors()); //allow access from same origin
app.use(express.json());

IngredientModel.sync({ alter: true }).then(() => {
    console.log("Ingredients table created or updated in SQLite.");
});

app.use("/api/test", testRoute);
app.use("/api/ingredients", ingredientsRoute);

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);