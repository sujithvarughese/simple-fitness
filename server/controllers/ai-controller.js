import { OpenAI } from "openai"
import dotenv from 'dotenv'
dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const fetchCuratedWorkout = async (req, res) => {
  const { age, gender, level, time, focus } = req.body.values
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Create a one day workout for the following profile: 
           age: ${age}
           gender: ${gender}
           experience level: ${level}
           time: ${time} minutes
           focus: ${focus}

          `
        }
      ]
    })
    res.status(200).json({
      workout: response?.choices[0]?.message.content
    })
  } catch (error) {
    throw new Error(error)
  }
}

export { fetchCuratedWorkout }