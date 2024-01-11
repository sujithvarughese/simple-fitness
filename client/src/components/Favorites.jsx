import { useGlobalContext } from '../context/GlobalContext.jsx'
import { FormControl, FormLabel } from '@chakra-ui/react'
import Select from 'react-select'
import { bodyPartsListSelect } from '../data.js'
import { useEffect, useState } from 'react'

const Favorites = ({ setResults }) => {

  const { favorites } = useGlobalContext()

  const [filteredFavorites, setFilteredFavorites] = useState(favorites)

  const handleChange = (value, action) => {
    const tempFilteredFavorites = favorites.filter(workout => {
      return workout.bodyPart === value.value
    })
    setFilteredFavorites(tempFilteredFavorites)
  }

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