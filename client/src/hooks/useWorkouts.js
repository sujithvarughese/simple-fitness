import { useState, useEffect } from 'react'
import { getWorkoutsPage } from "../utils/db.js"
const UseWorkouts = (pageNumber=1) => {

  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [isLastPage, setIsLastPage] = useState(false)

  useEffect(() => {
    // reset any previous set values
    setIsLoading(true)
    setIsError(false)
    setError({})

    const controller = new AbortController()
    const { signal } = controller

    return () => controller.abort()

  }, [pageNumber])


  return { results, isLoading, isError, error, isLastPage }

}

export default UseWorkouts