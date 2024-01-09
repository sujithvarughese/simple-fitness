import express from "express";
const router = express.Router()
import { getWorkoutsFromDB, addToDb, setLevel, editWorkout, deleteWorkout, convertToInt, getWorkoutNames } from "../controllers/workout-controller.js"

router.route("/").get(getWorkoutsFromDB).post(editWorkout).delete(deleteWorkout).patch(convertToInt)
router.route("/level").post(setLevel)
router.route("/gifs").post(addToDb)
router.route("/names").get(getWorkoutNames)
export default router