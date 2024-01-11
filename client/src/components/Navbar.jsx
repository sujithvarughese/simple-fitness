import { Flex, Heading, Box, Button, Text, Spacer, HStack, Image } from '@chakra-ui/react'
import Login from './Login.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import fitnessTextImg from "../assets/images/fitness-text.png"
import fitnessTextInvertedImg from "../assets/images/fitness-text-inverted.png"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, setShowRegisterModal, logout } = useGlobalContext()

  const navigate = useNavigate()
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
      <Heading>
        {user ?
        <Image
          src={fitnessTextImg}
          margin="-2"
          width="200px"
        ></Image>
        :
        <Image
          src={fitnessTextInvertedImg}
          margin="-2"
          width="200px"
        ></Image>
        }
      </Heading>
      {
        user ?
          <HStack>
            <Button onClick={logoutAndRedirect}>Log Out</Button>
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