import React from 'react'
import { VStack } from '@chakra-ui/react'
import Workout from './Workout.jsx'

const WorkoutList = ({ workouts }) => {
  return (
    <VStack>
      {
        workouts?.map((result, index) =>
          <Workout key={index} { ...result }/>
        )
      }
    </VStack>
  )
}

export default WorkoutList