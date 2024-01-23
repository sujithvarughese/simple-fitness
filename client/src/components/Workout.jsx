import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Flex, Heading, Icon, IconButton, Image, ListItem, OrderedList, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useGlobalContext } from '../context/GlobalContext.jsx'
import { db } from '../utils/db.js'

// this component returns a Card with workout information using props passed from WorkoutList
const Workout = ({ _id, image, name, target, instructions }) => {

  const { user, favorites, setFavorites } = useGlobalContext()

  // if current workout is in user's favorites, render heart button icon accordingly
  const isFavorite= favorites.some(favorite => favorite._id === _id)

  // function calls back end to add or remove workout based on _id
  const toggleFavorite = async () => {
    try {
      const response = await db.patch("/workouts", { id: _id })
      const { favorites } = response.data
      // favorites from response is an array of updated favorites, which is then updated in global state
      setFavorites(favorites)
    } catch (error) {
      throw new Error(error)
    }
  }
  // a few workouts in database do not have a gif, return to avoid reference error
  if (!image) return

  return (
    <Card m="1" boxShadow="dark-lg" width="100%">
      <SimpleGrid>
        <Flex justifyContent="space-between">
          <CardHeader>
            <Heading fontSize="24px" textTransform="capitalize">{name}</Heading>
            <Text fontWeight="500" textTransform="capitalize">Target Muscle: {target}</Text>
          </CardHeader>
          {
            // render filled heart if on favorites list, unfilled if not
            isFavorite ?
              <IconButton
                as={MdFavorite}
                aria-label="Unfavorite"
                onClick={toggleFavorite}
                bgColor="white"
                color="#B22222"
                margin="4"
                _hover={{ color: "#fecea8", cursor: "pointer" }}
              />
              :
              <IconButton
                as={MdFavoriteBorder}
                aria-label="Favorite"
                onClick={toggleFavorite}
                bgColor="white"
                margin="4"
                _hover={{ color: "#B22222", cursor: "pointer" }}
              />
          }
        </Flex>

        <CardBody>
          {/* Animated image (gif) of demonstrating workouts */}
          <Image marginTop="-8" marginX="auto" src={image} alt="gif"/>

          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton fontWeight="500">Instructions<AccordionIcon /></AccordionButton>
              <AccordionPanel>
                <OrderedList spacing="2">
                  {instructions.map((instruction, index) =>
                    <ListItem key={index}>{instruction}</ListItem>
                  )}
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

        </CardBody>
      </SimpleGrid>

    </Card>
  );
};

export default Workout;