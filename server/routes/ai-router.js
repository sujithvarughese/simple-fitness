import express from "express";
const router = express.Router()
import { fetchCuratedWorkout } from "../controllers/ai-controller.js"

router.route("/").post(fetchCuratedWorkout)

export default router