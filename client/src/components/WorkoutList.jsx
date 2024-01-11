import React from 'react'
import { VStack } from '@chakra-ui/react'
import Workout from './Workout.jsx'

// when results state in Fitness is changed, results are sent as workouts to this component to render as a list
const WorkoutList = ({ workouts }) => {
  return (
    <VStack bgColor="#1a1b21">
      {
        workouts?.map(workout =>
          <Workout key={workout.id} { ...workout }/>
        )
      }
    </VStack>
  )
}

export default WorkoutList