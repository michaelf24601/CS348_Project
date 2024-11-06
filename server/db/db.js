/* db.js server/db/sb.js */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.resolve(__dirname, '../../database/main.db');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: databasePath,
  });

  // Test the connection to Sequelize
(async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection to SQLite has been established successfully with Sequelize.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();


const connectToDB = async () => {
    try {
        console.log("before create")

        console.log("Using database file at:", databasePath);

        const db = await open({
            filename: databasePath,
            driver: sqlite3.Database
        });

        //create test table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS hello (
                message TEXT
            );
            
        `);

        const row = await db.get(`SELECT COUNT(*) AS count FROM hello`);
        if (row.count === 0) {
            await db.run(`
                INSERT INTO hello (message)
                VALUES ("Hello World!");
            `);
        }

        return db;
    } catch (error) {
        console.log("Error connecting to the database", error);
        throw error;
    }
};


export default sequelize;