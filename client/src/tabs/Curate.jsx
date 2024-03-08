import { Box, Button, FormControl, FormLabel, Slider, SliderFilledTrack, SliderThumb, SliderTrack, TabPanel, Text, VStack } from '@chakra-ui/react'
import Select from 'react-select'
import { genderListSelect, focusListSelect, levelListSelectText } from '../data.js'
import { useState } from 'react'
import db from '../utils/db.js'

const initialValues = {
  time: 30,
  age: 21,
  gender: { label: "Male", value: "male" },
  level:  { label: "Beginner", value: "beginner" },
  focus:  { label: "Strength Training", value: "strength training" }

}
const Curate = () => {

  const [values, setValues] = useState(initialValues)
  const [createdWorkout, setCreatedWorkout] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fetchCreatedWorkout = async () => {
    // if no values (additional protection in useEffect)
    if (Object.keys(values).length === 0) {
      return
    }
    try {
      setIsLoading(true)
      const response = await db.post("/ai", { values })
      const { workout } = response.data
      setCreatedWorkout(workout)
      console.log(workout)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    fetchCreatedWorkout()
  }
  const handleChange = (e) => {
    console.log(e)
    setValues({ ...values, [e.label]: e.value} )
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
            <Select
              name="gender"
              id="gender"
              type="text"
              value={values.gender}
              defaultValue={initialValues.gender}
              onChange={handleChange}
              options={genderListSelect}
            >
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="level">Experience Level</FormLabel>
            <Select
              name="level"
              id="level"
              type="text"
              defaultValue={initialValues.level}
              value={values.level}
              onChange={handleChange}
              options={levelListSelectText}
            >
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="focus">Focus</FormLabel>
            <Select
              name="focus"
              id="focus"
              type="text"
              value={values.focus}
              onChange={handleChange}
              options={focusListSelect}
            >
            </Select>
          </FormControl>
          <Button type="submit">Create my Workout</Button>
        </VStack>
      </form>

      <Box>
        <Text whiteSpace="break-spaces">
          {createdWorkout}
        </Text>

      </Box>
    </Box>
  )
}

export default Curate