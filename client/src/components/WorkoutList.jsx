import React from 'react'
import { VStack } from '@chakra-ui/react'
import Workout from './Workout.jsx'

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