/* Ingredient.js server/src/models/Ingredient.js */

import { DataTypes } from "sequelize";
import sequelize from "../../db/db.js";

const Ingredient = sequelize.define(
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
  }
);

export default Ingredient;
