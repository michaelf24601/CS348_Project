/*app.js server/app.js */

import express from "express";
import cors from "cors";
import testRoute from "./src/routes/test.route.js";
import ingredientsRoute from "./src/routes/ingredients.route.js";
import IngredientModel from "./src/models/Ingredient.js";
import { getSequelize, getSQLite } from "./db/db.js";

console.log("Starting app.js");

const app = express();
const PORT = 8080;


app.use(cors()); //allow access from same origin
app.use(express.json());

// Configure CORS
const corsOptions = {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};
  
app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

//initialize everything
const initializeApp = async () => {
    try {
        //initialize sequelize 
        const sequelize = await getSequelize();
        console.log("Sequelize initialized");

        //sync sequelize models
        await sequelize.sync({ alter: true});
        console.log("Sequelize models synced with the database.")

        //initialize SQLite
        const db = await getSQLite();
        console.log("SQLite initialized");

        //routes
        app.use("/api/test", testRoute);
        app.use("/api/ingredients", ingredientsRoute);

        app.get('/', (req, res) => {
            res.json({'message': 'ok'});
        });
        console.log("Routes initialized");

        app.options("*", cors(corsOptions)); // Preflight requests

        //start the server
        app.listen(
            PORT,
            () => console.log(`it's alive on http://localhost:${PORT}`)
        );
    } catch (error) {
        console.error("Error initializing the application");
        process.exit(1); //exit if application isn't initialized
    }
}

await initializeApp();