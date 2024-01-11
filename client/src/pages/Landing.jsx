import React from 'react'
import { Box, Button, ButtonGroup, Container, Flex, Heading, Image, SimpleGrid, Spacer, Text, VStack } from '@chakra-ui/react'
import fitnessTextImg from "../assets/images/fitness-text.png"
import keepThingsSimpleImg from "../assets/images/keep-things-simple-noBg.png"
import gymBagBannerImg from "../assets/images/gym-bag-banner.jpeg"
import gymMatBannerImg from "../assets/images/gym-mat-banner.jpeg"
import shoeTieBanner from "../assets/images/shoe-tie-banner.jpeg"
import shoeTieBannerNoBg from "../assets/images/shoe-tie-banner-noBg.png"
import dumbbellBanner from "../assets/images/dumbbell-banner.jpeg"
import previewWorkoutImg from "../assets/images/image-preview.png"
import start2024Img from "../assets/images/start-2024.jpeg"
import { useGlobalContext } from '../context/GlobalContext.jsx'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}
const Landing = () => {

  const { login, setShowRegisterModal } = useGlobalContext()

  const previewAsGuest = () => {
    login(credentials)
  }

  return (
    <VStack>
      <SimpleGrid>
        <Image src={start2024Img}></Image>
        <SimpleGrid
          height="360px"
          fontSize="28px"
          fontWeight="600"
          width="100%"
          color="white"
          placeItems="center"
          paddingLeft="40"
          paddingBottom="10"
          bgImage={gymMatBannerImg}
          bgSize="cover"
          position="relative"
        >
          <Heading>Thousands of workouts.</Heading>
        </SimpleGrid>

        <Flex
          height="360px"
          fontSize="28px"
          fontWeight="600"
          width="100%"
          color="black"
          placeItems="center"
          bgImage={dumbbellBanner}
          bgSize="cover"
          bgPosition="left"
        >

          <Image
            src={previewWorkoutImg}
            width={{ base: "240px", lg: "320px"}}
          >
          </Image>
          <Heading>Detailed<Spacer display={{ lg: "none" }}/> Animated<Spacer display={{ lg: "none" }}/> Images.</Heading>
        </Flex>

        <SimpleGrid>
          <Heading textAlign="center" fontSize="84px">SIMPLE</Heading>
          <Image src={fitnessTextImg}></Image>
          <Heading
            fontSize="20px"
            paddingTop="20px"
            paddingBottom="20px"
            textAlign="center"
          >
            Get Fit. The Simple Way.
          </Heading>
        </SimpleGrid>


      </SimpleGrid>



      <ButtonGroup size="lg" colorScheme="blackAlpha" variant="outline">
        <Button onClick={previewAsGuest}>Preview Site</Button>
        <Button onClick={setShowRegisterModal}>Create Account</Button>
      </ButtonGroup>

      <SimpleGrid
        height="360px"
        fontSize="28px"
        fontWeight="600"
        width="100%"
        color="white"
        placeItems="end"

        bgImage={gymBagBannerImg}
        bgSize="cover"
      >
        <Image
          src={keepThingsSimpleImg}
        ></Image>
      </SimpleGrid>




    </VStack>
  )
}

export default Landing