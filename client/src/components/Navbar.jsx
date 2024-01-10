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
            bgColor="#B22222"
    >
      <Heading>Simple Workout</Heading>
      {
        user ?
          <HStack>
            <Text>Welcome!</Text>
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