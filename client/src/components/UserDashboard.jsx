import connect from '../utils/connect.js'
import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext.jsx'
import WorkoutList from './WorkoutList.jsx'

const UserDashboard = ({ onSetSearchFields }) => {

  const { favorites } = useAuthContext()


  return (
    <Box>
      <WorkoutList workouts={favorites}/>
    </Box>
  )
}

export default UserDashboard