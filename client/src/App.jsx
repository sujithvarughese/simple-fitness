import { useEffect, useState } from 'react'
import FindWorkouts from './components/FindWorkouts.jsx'
import Workout from './components/Workout.jsx'
import axios from 'axios'
import { VStack } from '@chakra-ui/react'


function App() {

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
    <VStack maxWidth="1280px" minHeight="100vh" backgroundColor="antiquewhite">

      <FindWorkouts
        onSetSearchFields={onSetSearchFields}
        clear={clear}
      />
      <VStack>
        {
          results?.map((result, index) =>
            <Workout key={index} { ...result }/>
          )
        }
      </VStack>

    </VStack>
  )
}

export default App
