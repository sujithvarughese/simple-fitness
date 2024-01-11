import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Flex, Heading, Icon, IconButton, Image, ListItem, OrderedList, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useGlobalContext } from '../context/GlobalContext.jsx'
import connect from '../utils/connect.js'

// this component returns a Card with workout information using props passed from WorkoutList
const Workout = ({ _id, image, name, target, instructions, description, }) => {

  const { user, favorites, setFavorites } = useGlobalContext()

  // if current workout is in user's favorites, render heart button icon accordingly
  const isFavorite= favorites.some(favorite => favorite._id === _id)

  // function calls back end to add or remove workout based on _id
  const toggleFavorite = async () => {
    try {
      const response = await connect.patch("/workouts", { id: _id })
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
    <Card m="1" boxShadow="dark-lg" width={{ base: "97%", md: "800px"}}>
      <SimpleGrid>
        <Flex justifyContent="space-between">
          <CardHeader>
            <Heading textTransform="capitalize">{name}</Heading>
            <Text textTransform="capitalize">Target Muscle: {target}</Text>
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
          <Image src={image} alt="gif" borderRadius="10px" width="100%"/>

          {/* Not all workouts have description */}
          <Text>{description}</Text>

          <Accordion allowToggle>
            <AccordionItem>

              <AccordionButton>
                <Box>
                  Detailed Instructions
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel>
                <OrderedList>
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