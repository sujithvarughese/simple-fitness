import { useState } from 'react'
import FindWorkouts from './components/FindWorkouts.jsx'


function App() {

  const [workouts, setWorkouts] = useState([])

  return (
    <>
      <FindWorkouts setWorkouts={setWorkouts}/>
    </>
  )
}

export default App
