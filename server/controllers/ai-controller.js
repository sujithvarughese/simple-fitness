import { OpenAI } from "openai"
import dotenv from 'dotenv'
import Workout from '../models/Workout.js'
dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const fetchCuratedWorkout = async (req, res) => {
  console.log(req.body.values)
  const { age, gender, level, time, focus } = req.body.values
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      response_format: { "type": "json_object" },
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content: 'You are a helpful assistant designed generate a daily fitness routine based on age, gender, experience level, time, and workout focus. Provide your responses in JSON format like this { "workouts" :[{"name": "lunge", "3 sets of 25 reps"}, {"name": "dumbbell row", "instructions": "3 sets of 12 reps"}, ...]}'
        },/*
        {
          role: "user",
          content: `Create a workout routine using the following parameters: age: 25, gender: male, experience level: intermediate, time: 45 minutes, focus: strength`
        },
        {
          role: "assistant",
          content: {"Warm-up": ["5 minutes of jogging in place","5 minutes of arm circles", "5 minutes of leg swings"], "Strength Training Circuit": ["3 sets of 10 push-ups", "3 sets of 12 bicep curls with dumbbells", "3 sets of 12 tricep dips", "3 sets of 10 squats with a barbell"], "Core Workout": ["3 sets of 15 crunches", "3 sets of 10 leg raises", "3 sets of 30-second planks"], "Cool Down": ["5 minutes of stretching", "5 minutes of deep breathing"]}
        },*/
        {
          role: "user",
          content: `Create a workout routine using the following parameters: age:${age}, gender:${gender}, experience level:${level}, time:${time} minutes, focus:${focus}`
        },
      ]
    })
    const aiWorkouts = JSON.parse(response.choices[0].message.content)["workouts"]
    console.log(aiWorkouts)
    const updatedAiWorkouts = await Promise.all(aiWorkouts.map(async aiWorkout => {
      let workoutDetails = await Workout.findOne({ name:{ $regex: `${aiWorkout.name.substring(0, aiWorkout.name.length - 3).toLowerCase()}` }})
      if (aiWorkout.name.toLowerCase() === "plank") {
        console.log("hello")
        workoutDetails = await Workout.findOne({ name: "power point plank" })
      }
      return { ...aiWorkout, details: workoutDetails}
    }))
    res.status(200).json({
      workout: updatedAiWorkouts
    })
  } catch (error) {
    throw new Error(error)
  }
}

export { fetchCuratedWorkout }