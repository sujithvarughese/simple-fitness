import { FormLabel, Box } from '@chakra-ui/react'
import workoutNamesListSelect from '../workoutNames.js'
import AsyncSelect from 'react-select/async'

const Search = ({ onSetSearchFields }) => {

  const handleChange = (search) => {
    // search.value is returned from AsyncSelect, set in name property in order for back end to search property as-is
    onSetSearchFields({ name: search.value })
  }

  const loadOptions = (query, callback) => {
    // delay after user starts typing before searching
    setTimeout(() => {
      // filter workouts based on user-entered query once user has entered 3 letters
      if (query.length > 2) {
        const filteredWorkouts = workoutNamesListSelect.filter(workout => {
          return workout.label.toLowerCase().includes(query.toLowerCase())
        })
        // loadOptions enables immediate filtering on input change with callback function passing in filtered results
        callback(filteredWorkouts)
      }
    }, 100)
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