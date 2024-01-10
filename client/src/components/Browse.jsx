import {  VStack, FormControl, FormLabel, Box } from '@chakra-ui/react'
import { bodyPartsListSelect, equipmentListSelect, levelListSelect } from '../data.js'
import Select from 'react-select'
import { useEffect, useState } from 'react'

const Browse = ({ onSetSearchFields }) => {

  const [values, setValues] = useState({})

  const handleChange = (value, action) => {
    setValues({ ...values, [action.name]: value.value })
  }
  useEffect(() => {
    onSetSearchFields(values)
  }, [values])

  return (
    <Box>
        <VStack>
          <FormControl>
            <FormLabel htmlFor="bodyPart">Target Body Part</FormLabel>
            <Select
              name="bodyPart"
              id="bodyPart"
              type="text"
              onChange={handleChange}
              options={bodyPartsListSelect}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="equipment">Equipment</FormLabel>
            <Select
              name="equipment"
              id="equipment"
              type="text"
              onChange={handleChange}
              options={equipmentListSelect}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="bodyPart">Experience Level</FormLabel>
            <Select
              name="level"
              id="level"
              type="number"
              onChange={handleChange}
              options={levelListSelect}
            />
          </FormControl>
        </VStack>

    </Box>
  )
}

export default Browse