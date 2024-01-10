import express from "express"
import dotenv from "dotenv"
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import bodyParserErrorHandler from "express-body-parser-error-handler";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import { authenticateUser, authorizePermissions } from "./middleware/authentication.js";
import authRouter from './routes/auth-router.js'
import workoutRouter from "./routes/workout-route.js";
import { connectDatabase } from "./controllers/workout-controller.js";


const app = express()
const port = process.env.PORT || 8800
dotenv.config()


app.use(bodyParser.json({ limit: '600mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParserErrorHandler());
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"]
}));
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("home")
})
app.get("/api/v1", (req, res) => {
    res.send("API")
})
app.use("/api/v1/auth", authRouter);  // login, logout, register
app.use("/api/v1/workouts", workoutRouter)

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()