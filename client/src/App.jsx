import { useEffect, useState } from 'react'
import FindWorkouts from './components/FindWorkouts.jsx'
import Workout from './components/Workout.jsx'
import Navbar from './components/Navbar.jsx'
import WorkoutList from './components/WorkoutList.jsx'
import Register from './components/Register.jsx'
import axios from 'axios'
import { VStack, Container, Text, SimpleGrid } from '@chakra-ui/react'
import { useAuthContext } from './context/AuthContext.jsx'


function App() {

  const { showRegisterModal } = useAuthContext()

  const [values, setValues] = useState({})
  const [results, setResults] = useState([])

  const clear = () => {
    setValues({})
    setResults([])
  }
  const onSetSearchFields = searchFields => setValues(searchFields)
  const fetchWorkouts = async () => {
    if (Object.keys(values).length === 0) {
      return
    }
    try {
      const response = await axios(("http://localhost:8800/api/v1/workouts"), {
        params: {  ...values }
      })
      const { workouts } = response.data
      setResults(workouts)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (values === null) {
      return
    }
    fetchWorkouts()
  }, [values])

  return (
    <SimpleGrid>
      {showRegisterModal && <Register />}
      <Navbar />
      <FindWorkouts
        onSetSearchFields={onSetSearchFields}
        clear={clear}
      />

      {
        results.length > 0 ?
          <WorkoutList workouts={results} />
          :
          <Text>No Workouts to Show</Text>
      }



    </SimpleGrid>
  )
}

export default App
