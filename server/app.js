import express from "express";
import cors from "cors";
import testRoute from "./src/routes/test.route.js";

const app = express();
const PORT = 8080;

app.use(cors()); //allow access from same origin
app.use("/test", testRoute);

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);