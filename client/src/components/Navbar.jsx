import { Flex, Heading, Box, Button, Text, Spacer, HStack } from '@chakra-ui/react'
import Login from './Login.jsx'
const Navbar = () => {
  return (
    <HStack as="nav"
            p="10px"
            justify="space-between"
            alignItems="center"
            bgColor="#B22222"
    >
      <Heading>Simple Workout</Heading>

      <Login />
    </HStack>
  )
}

export default Navbar