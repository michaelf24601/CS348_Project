/* Ingredient.js server/src/models/Ingredient.js */

import { DataTypes } from "sequelize";
import { getSequelize } from "../../db/db.js"

let Ingredient;

const initializeIngredientModel = async () => {
  const sequelize = await getSequelize();

  Ingredient = sequelize.define(
    "Ingredient",
    {
      ingredient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ingredient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serving_size: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      serving_size_unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carbs: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      sugar: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      fiber: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      fat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      saturated_fat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      polyunsaturated_fat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      monounsaturated_fat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      protein: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      date_added: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "ingredients", // Table name in the database
      timestamps: false,        // Disable Sequelize's automatic timestamps
      indexes: [ 
        {
          fields:["ingredient_id"], // Index on ingredient_id
        },
        {
          unique: true, 
          fields: ["ingredient_name"], // Index on ingredient_name that enforces uniqueness
        },
      ],
    }
  );
}

await initializeIngredientModel();

export default Ingredient;
