import express from "express"
import cors from "cors"

import db from "./db/connect.js";

const app = express();
const PORT = 8080;

app.use(cors()); //allow access from same origin
app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);


app.get("/hello_world", async (req, res) => {
    try {
        const collection = db.collection("messages");
        const message = await collection.findOne();

        console.log(message);

        if (message) {
            res.send(message.content);
        } else {
            res.send("No message found");
        }
    } catch (err) {
        res.status(500).send("Error retrieving message");
    }
});