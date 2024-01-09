import { useEffect, useState } from 'react'
import FindWorkouts from './components/FindWorkouts.jsx'
import Workout from './components/Workout.jsx'
import axios from 'axios'


function App() {

  const [values, setValues] = useState({})
  const [results, setResults] = useState([])

  const clear = () => {
    setValues({})
    setResults([])
  }
  const onSetSearchFields = searchFields => setValues(searchFields)
  const fetchWorkout = async () => {
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
    fetchWorkout()
  }, [values])

  return (
    <>
      <FindWorkouts
        onSetSearchFields={onSetSearchFields}
        clear={clear}
      />
      {
        results?.map((result, index) =>
          <Workout key={index} { ...result }/>
        )
      }
    </>
  )
}

export default App
