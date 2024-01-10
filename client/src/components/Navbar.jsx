import { Flex, Heading, Box, Button, Text, Spacer, HStack } from '@chakra-ui/react'
import Login from './Login.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
const Navbar = () => {
  const { user, setShowRegisterModal, logout } = useGlobalContext()
  return (
    <HStack as="nav"
            p="10px"
            justify="space-between"
            alignItems="center"
            bgColor="#1a1b21"
            color="white"
    >
      <Heading>SF</Heading>
      {
        user ?
          <HStack>
            <Text textTransform="capitalize">Hello {user.firstName}!</Text>
            <Button onClick={logout}>Log Out</Button>
          </HStack>

          :
          <Box>
            <Login />
            <Text>Don't have an Account? <button type="click" onClick={setShowRegisterModal}>Register</button></Text>
          </Box>

      }

    </HStack>
  )
}

export default Navbar