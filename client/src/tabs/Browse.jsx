import {  VStack, FormControl, FormLabel, Box } from '@chakra-ui/react'
import { bodyPartsListSelect, equipmentListSelect, levelListSelect } from '../data.js'
import Select from 'react-select'
import { useEffect, useState } from 'react'

const Browse = ({ onSetSearchFields, setResults }) => {

  const [values, setValues] = useState({})

  // set values dynamically based on property name which is sent unchanged to back end
  const handleChange = (value, action) => {
    setResults([])
    setValues({ ...values, [action.name]: value.value })
  }

  // when local values state is updated, onSetSearchFields (passed from Fitness) triggers back end call with values
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
            <FormLabel htmlFor="equipment">Available Equipment</FormLabel>
            <Select
              name="equipment"
              id="equipment"
              type="text"
              onChange={handleChange}
              options={equipmentListSelect}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="level">Experience Level</FormLabel>
            <Select
              name="level"
              id="level"
              type="text"
              onChange={handleChange}
              options={levelListSelect}
            />
          </FormControl>
        </VStack>

    </Box>
  )
}

export default Browse