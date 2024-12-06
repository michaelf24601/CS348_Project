/* db.js server/db/sb.js */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.resolve(__dirname, '../../database/main.db');
console.log("Database path:", databasePath);

//databse connection with Sequelize

const connectSequelize = async () => {
    try {
        const sequelize = new Sequelize({
            dialect: "sqlite",
            storage: databasePath,
            logging: console.log, 
        });
        await sequelize.authenticate();
        console.log("Connection to database with Sequelize sucessful.");
        return sequelize;
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}

//Database connection with SQLite

const connectSQLite = async () => {
    try {
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
        console.log("Connection to databse with SQLite sucessful.");
        return db;
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
    }
};

//export 

let sequelize;
export const getSequelize = async () => {
    if (!sequelize) {
        sequelize = await connectSequelize();
    }
    return sequelize;
}

let db;
export const getSQLite = async () => {
    if (!db) {
        db = await connectSQLite();
    }
    return db;
}