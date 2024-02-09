import { useGlobalContext } from '../context/GlobalContext.jsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import db from '../utils/db.js'
import { Box, Card, Heading, Image, Progress, SimpleGrid, VStack } from '@chakra-ui/react'
import FindWorkouts from '../tabs/FindWorkouts.jsx'
import smallStepsBannerImg from "../assets/images/small-steps-banner.jpeg"
import fitnessBg from "../assets/images/fitness-bg.jpeg"
import fitnessBgFull from "../assets/images/fitness-bg-full.jpeg"
import Workout from '../components/Workout.jsx'

// root page for workouts loaded on login
const Fitness = () => {

  const { user } = useGlobalContext()

  // search parameters selected by user
  const [values, setValues] = useState({})

  // page number for paginated results
  const [pageNumber, setPageNumber] = useState(0)

  // for progress bar, controlled in fetch function
  const [isLoading, setIsLoading] = useState(false)

  // passed down function that sets local state
  const onSetSearchFields = searchFields => setValues(searchFields)

  // array of workouts based on user selections
  // passed down to Favorites which sets workouts when selected
  const [results, setResults] = useState([])

  // On tab change, clear workouts that were displayed and previous search inputs
  // passed down to FindWorkouts
  const clear = () => {
    setValues({})
    setResults([])
  }

  const fetchWorkouts = async () => {
    // if no values (additional protection in useEffect)
    if (Object.keys(values).length === 0) {
      return
    }
    try {
      setIsLoading(true)
      const response = await db(`/workouts/?page=${pageNumber}`, {
        params: { values }
      })
      const { workouts } = response.data
      setResults([...results, ...workouts])
    } catch (error) {
      throw new Error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // ref placed on an element to indicate end of current results
  const intObserver = useRef()

  const lastResultRef = useCallback(intersection => {
    if (isLoading) return
    if (intObserver.current) {
      intObserver.current.disconnect()
    }
    intObserver.current = new IntersectionObserver(intersections => {
      if (intersections[0].isIntersecting) {
        setPageNumber(prevState => prevState + 1)
      }
    })
    if (intersection) intObserver.current.observe(intersection)
  }, [])

  // set pageNumber to 0 if values changes since fetched workouts are added to results array
  useEffect(() => {
    setPageNumber(0)
  }, [values])

  // when values or pageNumber is changed by function passed through props is called, back-end call to get matching workouts
  useEffect(() => {
    fetchWorkouts()
  }, [values, pageNumber])


  // scroll to top of page on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);


  return (
    <SimpleGrid>
      <SimpleGrid
        position="relative"
        placeItems="center"
      >
        <Heading
          color="white"
          position="absolute"
          left="50px"
        >Hello, {user.firstName}!
        </Heading>
        <Image src={smallStepsBannerImg}></Image>
      </SimpleGrid>

      <VStack
        width="100%"
        minHeight="100vh"
        height="100%"
        bgImage={{ base: fitnessBg, md: fitnessBgFull }}
        bgSize="contain"
      >
        <Card
          marginTop={{ base: "-3", sm: "-5", md: "-7", lg: "-12", xl: "-20"}}
          marginBottom="10"
          width="90%"
          maxWidth="600px"
        >
          {/* tabbed display where user finds workouts. Browse and Search tabs set search state which is updated in this component state */}
          <FindWorkouts
            onSetSearchFields={onSetSearchFields}
            setResults={setResults}
            clear={clear}
          />

          <Progress size="xs" isIndeterminate={isLoading}/>
          {
            // when above search fields are changed, new list of workouts is rendered
            // Favorites tab does not use this components search fields state; Results are directly manipulated from Favorites
            results.length > 0 &&
            <VStack bgColor="#1a1b21">
              {
                results?.map((workout, index) =>
                  // place ref in last element for intersection observer
                  index + 1 === results.length ?
                    <Workout key={workout.id} ref={lastResultRef} { ...workout }/>
                    :
                    <Workout key={workout.id} { ...workout }/>
                )
              }
            </VStack>
          }
        </Card>
      </VStack>
      <Progress size="lg" isIndeterminate={isLoading}/>
    </SimpleGrid>
  )
}

export default Fitness