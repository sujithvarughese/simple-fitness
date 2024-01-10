import { useEffect, useState } from 'react'
import FindWorkouts from './components/FindWorkouts.jsx'
import Workout from './components/Workout.jsx'
import Landing from './pages/Landing.jsx'
import Navbar from './components/Navbar.jsx'
import WorkoutList from './components/WorkoutList.jsx'
import Register from './components/Register.jsx'
import Layout from "./layouts/Layout.jsx"
import Error from "./pages/Error.jsx"
import axios from 'axios'
import { VStack, Container, Text, SimpleGrid } from '@chakra-ui/react'
import { useGlobalContext } from './context/GlobalContext.jsx'
import connect from './utils/connect.js'
import { createBrowserRouter, createRoutesFromElements,  RouterProvider, Route } from "react-router-dom";
import Fitness from './pages/Fitness.jsx'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="fitness" element={<Fitness />} />
      </Route>
    )
  )

  const { user, showRegisterModal } = useGlobalContext()

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
      const response = await connect("/workouts", {
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

  return <RouterProvider router={router} />

}

export default App
