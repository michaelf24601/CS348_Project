import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); //load enviroment variables from .env file

const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    await client.connect();

    await client.db("my_database").command({ ping: 1});
    console.log("Connected to database!");
} catch (err) {
    console.error("Unable to connect", err);
}

let db = client.db("my_database");

export default db;