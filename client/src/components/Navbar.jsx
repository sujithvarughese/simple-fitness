import { Flex, Heading, Box, Button, Text, Spacer, HStack } from '@chakra-ui/react'
import Login from './Login.jsx'
import { useAuthContext } from '../context/AuthContext.jsx'
const Navbar = () => {
  const { setShowRegisterModal } = useAuthContext()
  return (
    <HStack as="nav"
            p="10px"
            justify="space-between"
            alignItems="center"
            bgColor="#B22222"
    >
      <Heading>Simple Workout</Heading>

      <Login />
      <Text>Don't have an Account? <button type="click" onClick={setShowRegisterModal}>Register</button></Text>
    </HStack>
  )
}

export default Navbar