import express from "express"
import dotenv from "dotenv"
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import bodyParserErrorHandler from "express-body-parser-error-handler";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import { authenticateUser, authorizePermissions } from "./middleware/authentication.js";
import authRouter from './routes/auth-router.js'
import workoutRouter from "./routes/workout-router.js";
import aiRouter from './routes/ai-router.js'
import { connectDatabase } from "./controllers/workout-controller.js";

const app = express()
const port = process.env.PORT || 8800
dotenv.config()

app.use(cors({
    origin: ["http://localhost:5173", "https://simpler-fitness.com", "https://simpler-fitness.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParserErrorHandler());
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

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
app.use("/api/v1/ai", aiRouter)

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