import { FormLabel, Box } from '@chakra-ui/react'
import workoutNamesListSelect from '../../workoutNames.js'
import AsyncSelect from 'react-select/async'

const Search = ({ onSetSearchFields }) => {

  const handleChange = (search) => {
    onSetSearchFields({ name: search.value })
  }

  const loadOptions = (query, callback) => {
    setTimeout(() => {
      const filteredWorkouts = workoutNamesListSelect.filter(workout => {
        return workout.label.toLowerCase().includes(query.toLowerCase())
      })
      callback(filteredWorkouts)
    }, 1000)
  }

  return (
    <Box textTransform="capitalize">
        <FormLabel htmlFor="query">Search any exercise by name</FormLabel>
        <AsyncSelect
          id="query"
          name="query"
          onChange={handleChange}
          loadOptions={loadOptions}
        />
    </Box>
  )
}

export default Search