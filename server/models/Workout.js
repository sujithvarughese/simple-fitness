import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  target: {
    type: Boolean,
    default: false
  },
  secondaryMuscles: {
    type: String,
    required: true,
  },
  instructions: [{
    type: String,
    required: true,
  }],
  image: [{
    type: String,
    required: true,
  }],
  level: {
    type: String,
    required: true,
  }
}, { timestamps: true });


export default mongoose.model("Workout", WorkoutSchema);