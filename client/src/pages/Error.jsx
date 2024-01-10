import { useRouteError } from "react-router-dom";
import { Container, Heading } from '@chakra-ui/react'

const Error = () => {

  const error = useRouteError()
  console.log(error)

  return (
    <Container>
      <Heading>{error.status} - {error.statusText}</Heading>
      <Text>{error.data}</Text>
    </Container>
  )
}

export default Error