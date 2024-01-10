import connect from '../utils/connect.js'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import WorkoutList from './WorkoutList.jsx'
import Select from 'react-select'
import { bodyPartsListSelect } from '../data.js'

const UserDashboard = () => {

  const { favorites } = useGlobalContext()


  return (
    <Box>

      <WorkoutList workouts={favorites} />
    </Box>
  )
}

export default UserDashboard