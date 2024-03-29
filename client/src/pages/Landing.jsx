import { Button, ButtonGroup, Flex, Heading, Image, keyframes, SimpleGrid, Spacer, VStack } from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import fitnessTextImg from "../assets/images/fitness-text.png"
import keepThingsSimpleImg from "../assets/images/keep-things-simple-noBg.png"
import gymBagBannerImg from "../assets/images/gym-bag-banner.jpeg"
import gymMatBannerImg from "../assets/images/gym-mat-banner.jpeg"
import dumbbellBanner from "../assets/images/dumbbell-banner.jpeg"
import previewWorkoutImg from "../assets/images/image-preview.png"
import start2024Img from "../assets/images/start-2024.jpeg"
import { useState } from 'react'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

const Landing = () => {

  const { login, setShowRegisterModal } = useGlobalContext()

  const [guestLoginLoading, setGuestLoginLoading] = useState(false)

  // function for Preview Site button click; Uses guest credentials to automatically log in
  const previewAsGuest = async () => {
    try {
      setGuestLoginLoading(true)
      await login(credentials)
    } catch (error) {
      throw new Error(error)
    } finally {
      setGuestLoginLoading(false)
    }
  }

  const glow = keyframes`
    0% { border: 2px black solid }
    50% { border: 2px orange solid }
    100% { border: 2px black solid }
  `
  const glowAnimation = `${glow} infinite 1.5s ease-in-out`

  return (
    <VStack>
      <SimpleGrid>
        <Image src={start2024Img}></Image>
        <SimpleGrid
          height={{ base: "360px", sm: "420px", md: "540px", lg: "640px" }}
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
          <Heading
            fontSize={{base: "30px", sm: "34px", md: "42px" }}
          >Thousands<Spacer display={{ lg: "none" }}/> of workouts.</Heading>
        </SimpleGrid>

        <Flex
          height={{ base: "360px", sm: "420px", md: "540px",  lg: "640px" }}
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
          <Heading
            fontSize={{ base: "30px", sm: "34px", md: "42px" }}
          >Detailed<Spacer display={{ lg: "none" }}/> Animated<Spacer display={{ lg: "none" }}/> Images.
          </Heading>
        </Flex>

        <SimpleGrid>
          <Heading textAlign="center" fontSize="84px">SIMPLER</Heading>
          <Image src={fitnessTextImg}></Image>
          <Heading
            fontSize="20px"
            paddingTop="20px"
            paddingBottom="20px"
            textAlign="center"
          >
            Get Fit. The Simpler Way.
          </Heading>
        </SimpleGrid>
      </SimpleGrid>


      <ButtonGroup size="lg" colorScheme="blackAlpha" variant="outline">
        <Button
          onClick={previewAsGuest}
          isLoading={guestLoginLoading}
          animation={glowAnimation}
        >Preview Site
        </Button>
        {/* toggle modal function from context / rendered from Layout */}
        <Button animation={glowAnimation} onClick={setShowRegisterModal}>Create Account</Button>
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