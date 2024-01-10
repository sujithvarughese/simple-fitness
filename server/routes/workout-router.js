import express from "express";
const router = express.Router()
import { getWorkoutsFromDB, toggleFavorites } from "../controllers/workout-controller.js"
import { authenticateUser } from '../middleware/authentication.js'

router.route("/")
  .get(getWorkoutsFromDB)
  .patch(authenticateUser, toggleFavorites)

export default router