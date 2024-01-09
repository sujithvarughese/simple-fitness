import {MongoClient} from "mongodb";


let db
const addToDb = async (req, res) => {
    try {
        await db.collection("workout").updateOne({ id: req.body.fileId }, { $set: { image: req.body.image } }, { multi: true })
        res.send("Saved")
    } catch (error) {
        throw new Error(error)
    }
}
const setLevel = async (req, res) => {
    try {
        await db.collection("workout").updateOne({ id: req.body.fileId } , { $set: { level: req.body.level } }, { returnDocument: true } )
        res.send({
            msg: "success",
        })
    } catch (error) {
        throw new Error(error)
    }
}
const editWorkout = async (req, res) => {
    console.log(req.body)
    try {
        await db.collection("workout").updateOne({ id: req.body.fileId } , { $set: { description: req.body.description } }, { returnDocument: true })
        res.send({ msg: "success"})
    } catch (error) {
        throw new Error(error)
    }
}

const deleteWorkout = async (req, res) => {
    try {
        await db.collection("workout").deleteOne({ id: req.body.fileId })
        res.send({ msg: "success"})
    } catch (error) {
        throw new Error(error)
    }
}
const getWorkoutNames = async (req, res) => {
    let workoutNames = []
    try {
        await db.collection("workout")
          .find({}, { name: 1})
          .forEach(workout => {
              console.log(workout.name)
              workoutNames.push(workout.name)
          })
    } catch (error) {
        throw new Error(error)
    }
    res.send({
        msg: "success",
        workoutNames: workoutNames
    })
}
const getWorkoutsFromDB = async (req, res) => {
    let workouts = []
    try {
        await db.collection("workout")
            .find({ $and: [req.query] })
            .limit(50)
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

// convert all string values of attribute to int
const convertToInt = async (req, res) => {
    try {
        await db.collection("workout").updateMany({},[{ "$set": { "level": { "$toInt": "$level" } } }],{ "multi" : true })
        res.send({ msg: "success" })
    } catch (error) {
        throw new Error(error)
    }
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



export { getWorkoutsFromDB, connectDatabase, addToDb, setLevel, editWorkout, deleteWorkout, curateWorkout, convertToInt, getWorkoutNames }