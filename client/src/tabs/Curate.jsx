import { Box, Button, FormControl, FormLabel, Radio, RadioGroup, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, TabPanel, Text, VStack } from '@chakra-ui/react'
import { genderListSelect, focusListSelect, levelListSelectText } from '../data.js'
import { useState } from 'react'
import db from '../utils/db.js'

const initialValues = {
  time: 30,
  age: 21,
  gender: "male",
  level:  "beginner",
  focus:  "strength"

}
const Curate = () => {

  const [values, setValues] = useState(initialValues)
  const [curatedWorkout, setCuratedWorkout] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fetchCuratedWorkout = async () => {
    // if no values (additional protection in useEffect)
    if (Object.keys(values).length === 0) {
      return
    }
    try {
      setIsLoading(true)
      const response = await db.post("/ai", { values })
      const responseJSON = JSON.parse(response.data.workout)
      console.log(responseJSON["workouts"])
      setCuratedWorkout(responseJSON.workouts)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }


  const handleSubmit = (e) => {
    console.log(values)
    e.preventDefault()
    fetchCuratedWorkout()
  }
  const handleChange = (value, action) => {
    setValues({ ...values, [action.name]: value.value } )
  }
  return (
    <Box>
      <VStack>
        
      </VStack>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel htmlFor="time">Time: {values.time} minutes</FormLabel>
            <Slider
              aria-label="slider"
              name="time"
              id="time"
              type="number"
              value={values.time}
              min={15}
              max={120}
              step={1}
              onChange={val => setValues({ ...values, time: val})}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="age">Age: {values.age}</FormLabel>
            <Slider
              aria-label="slider"
              name="age"
              id="age"
              type="number"
              value={values.age}
              min={12}
              max={110}
              step={1}
              onChange={val => setValues({ ...values, age: val})}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="gender">gender</FormLabel>
            <RadioGroup
              name="gender"
              value={values.gender}
              onChange={(e)=>setValues({ ...values, gender: e })}
            >
              <Stack>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="level">Experience Level</FormLabel>
            <RadioGroup
              name="level"
              value={values.level}
              onChange={(e)=>setValues({ ...values, level: e })}
            >
              <Stack>
                <Radio value="beginner">Beginner</Radio>
                <Radio value="intermediate">Intermediate</Radio>
                <Radio value="expert">Expert</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="focus">Focus</FormLabel>
            <RadioGroup
              name="focus"
              value={values.focus}
              onChange={(e)=>setValues({ ...values, focus: e })}
            >
              <Stack>
                <Radio value="strength">Strength</Radio>
                <Radio value="cardio">Cardio</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Button type="submit">Create my Workout</Button>
        </VStack>
      </form>


      <Box display="flex" flexDirection="column" gap={5}>
        {
          curatedWorkout?.length > 0 &&
          curatedWorkout.map((workout, index) => {
          return (
            <Box key={index}>
              <Text fontWeight={700} textTransform="capitalize">{workout.name}</Text>
              <Text whiteSpace="break-spaces">{workout.instructions}</Text>
            </Box>
          )
        })}

      </Box>
        

    </Box>
  )
}

export default Curate