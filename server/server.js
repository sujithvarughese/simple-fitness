import express from "express"
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv"
dotenv.config()
const app = express()
const port = process.env.PORT || 8800
import bodyParser from "body-parser"
import bodyParserErrorHandler from "express-body-parser-error-handler";

dotenv.config();

import workoutRouter from "./routes/workout-route.js";
import { connectDatabase } from "./controllers/workout-controller.js";

app.use(bodyParser.json({ limit: '600mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParserErrorHandler());

app.use(cors({
    origin: ["http://localhost:5173"]
}));
app.use(express.json())
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}


const start = async () => {
    try {
        await connectDatabase(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

app.get("/", (req, res) => {
    res.send("home")
})
app.get("/api/v1", (req, res) => {
    res.send("API")
})
app.use("/api/v1/workouts", workoutRouter)
app.get("*", (req, res) => {
    res.sed("No Page Found");
})


start()