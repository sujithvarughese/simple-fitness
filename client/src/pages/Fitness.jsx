import FindWorkouts from '../components/FindWorkouts.jsx'
import WorkoutList from '../components/WorkoutList.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import { useEffect, useState } from 'react'
import connect from '../utils/connect.js'
import Error from './Error.jsx'
import { Box, Container, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import smallStepsBannerImg from "../assets/images/small-steps-banner.jpeg"
import weightsBg from "../assets/images/weights-bg.jpeg"
import dumbbellBg from "../assets/images/dumbbell-bg.jpeg"
import fitnessEquipBg from "../assets/images/fitness-equip-bg.jpeg"

const Fitness = () => {

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

  const backgrounds = [weightsBg, dumbbellBg, fitnessEquipBg]
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
  useEffect(() => {
    if (values === null) {
      return
    }
    fetchWorkouts()
  }, [values])

  return (
    <VStack
      height="100vh"
      bgImage={background}
      bgSize="cover"

    >
      <Image src={smallStepsBannerImg}></Image>
      <Container
        bgColor="white"
        m="6"
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
      </Container>

    </VStack>
  )
}

export default Fitness