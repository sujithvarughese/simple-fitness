import { Flex, Heading, Box, Button, Text, Spacer, HStack, Image } from '@chakra-ui/react'
import Login from './Login.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import fitnessTextImg from "../assets/images/fitness-text.png"
import fitnessTextInvertedImg from "../assets/images/fitness-text-inverted.png"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useGlobalContext()

  const navigate = useNavigate()

  // navigate to landing page, then logout
  const logoutAndRedirect = () => {
    navigate("/")
    logout()
  }

  return (
    <HStack as="nav"
            p={user ? "0" : "10px"}
            paddingLeft="15px"
            paddingRight="15px"
            justify="space-between"
            alignItems="center"
            bg={user ? "white" : "#1a1b21"}
            color={user ? "black" : "white"}
    >
      <Heading
        alignItems="center"
      >
        {user ?
        <Image
          src={fitnessTextImg}
          margin="-3"
          width="200px"
        ></Image>
        :
        <>
          <Text fontSize="18px" textAlign="center">Simpler</Text>
          <Image
            src={fitnessTextInvertedImg}
            marginY="-4"
            width="200px"
          ></Image>
        </>

        }
      </Heading>
      {
        user ?
          <HStack>
            <Button onClick={logoutAndRedirect} colorScheme="blackAlpha" variant="outline">Log Out</Button>
          </HStack>
          :
          <Box>
            <Login />
          </Box>
      }
    </HStack>
  )
}

export default Navbar