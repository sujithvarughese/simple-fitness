import FindWorkouts from '../components/FindWorkouts.jsx'
import WorkoutList from '../components/WorkoutList.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import { useEffect, useState } from 'react'
import connect from '../utils/connect.js'
import Error from './Error.jsx'
import { Box, Card, Container, Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import smallStepsBannerImg from "../assets/images/small-steps-banner.jpeg"
import weightsBg from "../assets/images/weights-bg.jpeg"
import dumbbellBg from "../assets/images/dumbbell-bg.jpeg"
import fitnessEquipBg from "../assets/images/fitness-equip-bg.jpeg"
import fitnessBg from "../assets/images/fitness-bg.jpeg"

const Fitness = () => {

  const { user } = useGlobalContext()

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

  const [background, setBackground] = useState("")
  const backgrounds = [weightsBg, dumbbellBg, fitnessEquipBg]
  useEffect(() => {
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)])
  }, [])

  useEffect(() => {
    if (values === null) {
      return
    }
    fetchWorkouts()
  }, [values])

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
        bgImage={fitnessBg}
        bgSize="contain"
      >
        <Card
          bgColor="white"
          marginX="4"
          marginTop={{md: "-7", lg: "-12", xl: "-20"}}
          marginBottom="10"
          width={{ base: "97%", md: "800px"}}
        >
          <FindWorkouts
            onSetSearchFields={onSetSearchFields}
            setResults={setResults}
            clear={clear}
          />

          {
            results.length > 0 ?
              <WorkoutList workouts={results} />
              :
              <Text>No Workouts to Show</Text>
          }
        </Card>
      </VStack>


    </SimpleGrid>
  )
}

export default Fitness