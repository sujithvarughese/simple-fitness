import {useState} from "react";
import axios from "axios";
import Select from 'react-select'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Heading, Image, ListItem, OrderedList, Text, VStack } from '@chakra-ui/react'

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

    const setWorkoutLevel = async (levelUpdate) => {
        try {
            const response = await axios.post("http://localhost:8800/api/v1/workouts/level", { fileId: id, level: levelUpdate })
            console.log(response.data)
        } catch (error) {
            throw new Error(error)
        }

    }

    if (!image) return

    return (
        <Card borderRadius="10px" boxShadow="dark-lg" width="80%" maxWidth="650px">
          <VStack>
            <CardHeader>
              <Heading>{name || WorkOut }</Heading>
              <Text>Target Muscle: {target}</Text>
              <Text>Level: {level}</Text>
            </CardHeader>

            <CardBody>
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