import { FormControl, FormLabel, TabPanel, Input, FormErrorMessage } from '@chakra-ui/react'
import workoutNamesListSelect from '../../workoutNames.js'
import AsyncSelect from 'react-select/async'
const workoutNames = ["arm", "leg", "back"]
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
    <TabPanel>
        <FormLabel htmlFor="query">Name</FormLabel>
        <AsyncSelect
          id="query"
          name="query"
          onChange={handleChange}
          loadOptions={loadOptions}
        />
    </TabPanel>
  )
}

export default Search