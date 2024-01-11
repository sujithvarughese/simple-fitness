import { useGlobalContext } from '../context/GlobalContext.jsx'
import { FormControl, FormLabel } from '@chakra-ui/react'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { bodyPartsListSelect } from '../data.js'
const Favorites = ({ setResults }) => {

  const { favorites } = useGlobalContext()

  // use local state to control results when user filters favorites by target area
  const [filteredFavorites, setFilteredFavorites] = useState(favorites)

  // set local state when user selects a filter
  const handleChange = (value, action) => {
    const tempFilteredFavorites = favorites.filter(workout => {
      return workout.bodyPart === value.value
    })
    setFilteredFavorites(tempFilteredFavorites)
  }

  // when workout is added or removed from favorites, trigger re-render using updated global favorites
  useEffect(() => {
    setFilteredFavorites(favorites)
  }, [favorites])

  // setResults passed from Fitness -> FindWorkouts controls list of displayed workouts
  // when user selects or changes filter (in local state), set state from Fitness to accordingly render filtered results
  useEffect(() => {
    setResults(filteredFavorites)
  }, [filteredFavorites])

  return (
    <div>
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
    </div>
  )
}

export default Favorites