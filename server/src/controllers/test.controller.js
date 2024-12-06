import { getSQLite } from "../../db/db.js";

const helloWorld = async (req, res) => {
    try {
        const db = await getSQLite();
        const message = await db.get("SELECT * FROM hello");
        //get will return the first result row only
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({error: "Failed to retrieve hello message from database."});
    }

};

export default {
    helloWorld,
}