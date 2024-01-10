import {MongoClient} from "mongodb";
import Workout from '../models/Workout.js'
import User from '../models/User.js'
import { StatusCodes } from "http-status-codes"

let db

const toggleFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        const favorites = [...user.favorites]
        const filteredFavorites = favorites.filter(workout => workout !== req.body)
        if (filteredFavorites.length === favorites.length) {
            filteredFavorites.push(req.body)
        }
        await User.findByIdAndUpdate(req.user.userID, { favorites: filteredFavorites })
        res.send({ msg: "success" })
    } catch (error) {
        throw new Error(error)
    }
}


const getWorkoutsFromDB = async (req, res) => {
    try {
        const workouts = await Workout.find(req.query).limit(10)
        res.send({
            msg: "success",
            workouts: workouts
        })
    } catch (error) {
        throw new Error(error)
    }

}
const curateWorkout = async (req, res) => {
    const { level, equipment, duration } = req.body
    const numWorkouts = Math.floor(Number(duration) / 15)
    let chest = []
    let legs = []
    let cardio = []
    let back = []
    let shoulders = []
    let arms = []
    let waist = []
    let workouts = []

    try {
        await db.collection("workout").find({ $and: [{ level: { $lt: req.body.level } }, ] })
            .sort({ name: 1 })
            .forEach(workout => workouts.push(workout))
    } catch (error) {
        throw new Error(error)
    }


    res.send({
        msg: "success",
        workouts: workouts
    })
}


const connectDatabase = async (uri) => {
    try {
        const client = new MongoClient(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await client.connect()
        console.log("Connected to Database");
        db = client.db()
        return db
    } catch (error) {
        console.log(error.error);
    }
}



export { getWorkoutsFromDB, toggleFavorites, connectDatabase, curateWorkout }