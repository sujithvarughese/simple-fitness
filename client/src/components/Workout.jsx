import {useState} from "react";
import axios from "axios";
import Select from 'react-select'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Heading, Icon, IconButton, Image, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useAuthContext } from '../context/AuthContext.jsx'
const Workout = ({
                     _id,
                     bodyPart,
                     equipment,
                     id,
                     image,
                     level,
                     name,
                     target,
                     secondaryMuscle,
                     instructions,
                     description,
    }) => {

    const [showInstructions, setShowInstructions] = useState(false)

    const { user, favorites } = useAuthContext()

    const [isFavorite, setIsFavorite] = useState(favorites.includes(_id))
    const toggleFavorite = async () => {
      console.log("toggling...")
        try {
            const response = await axios.patch("http://localhost:8800/api/v1/workouts", { id: _id })
            console.log(response.data)
        } catch (error) {
            throw new Error(error)
        }
    }

    if (!image) return

    return (
        <Card
          borderRadius="10px"
          boxShadow="dark-lg"
          width={{ base: "97%", sm: "600px"}}

        >
          <VStack>
            <CardHeader>
              <Heading textTransform="capitalize">{name || WorkOut }</Heading>
              <Text textTransform="capitalize">Target Muscle: {target}</Text>
            </CardHeader>

            <CardBody>
              {
                user && (
                  isFavorite ?
                  <IconButton
                    as={MdFavorite}
                    aria-label="Unfavorite"
                    onClick={toggleFavorite}
                  />
                  :
                  <Icon
                    as={MdFavoriteBorder}
                    aria-label="Favorite"
                    onClick={toggleFavorite}
                  />
                )
              }
              <Image src={image} alt="gif" borderRadius="10px" width="100%"/>

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
          </VStack>

        </Card>
    );
};

export default Workout;