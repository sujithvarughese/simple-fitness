import { useState, useEffect } from 'react'
import db from '../utils/db.js'

// not in use -> see Fitness.jsx for api calls
const useWorkouts = () => {

  const [values, setValues] = useState({})
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const pageLimit = 10

  const onSetSearchFields = async (searchFields) => {
    setValues(searchFields)
    setResults([])
    setPageNumber(1)
    await getWorkoutsPage()
  }

  const clear = () => setValues({})

  const getWorkoutsPage = async () => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    setError({})
    //const controller = new AbortController()
    //const { signal } = controller
    try {
      const response = await db(`workouts/?page=${pageNumber}`, {
        params: { values }
      })
      const { workouts } = response.data
      setHasNextPage(workouts.length === pageLimit)
      //setResults(prev => [...prev, ...workouts])
      setResults(workouts)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      //if (signal.aborted) return
      setIsError(true)
      setError(error.message)
    }
    //return () => controller.abort()
  }

  useEffect(() => {
    if (values === null) return
    console.log("hello")
  }, [pageNumber])


  return { clear, onSetSearchFields, values, setValues, results, setResults, isLoading, isError, error, hasNextPage }

}



export default useWorkouts