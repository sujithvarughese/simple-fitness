import { useFormik } from "formik";
import * as Yup from 'yup';
import {
  Box,
  Button, ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  keyframes,
  Text,
  VStack
} from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import { useState } from 'react'

const credentials = {
  email: import.meta.env.VITE_ADMIN_LOGIN,
  password: import.meta.env.VITE_ADMIN_PASSWORD
}

const Login = () => {

  const { login } = useGlobalContext()
  const [loginLoading, setLoginLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoginLoading(true)
        await login(values)
      } catch (error) {
        throw new Error(error)
      } finally {
        setLoginLoading(false)
      }
      formik.resetForm()
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email Address").required("Required"),
      password: Yup.string().required("Required"),
    })
  });

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
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <HStack alignItems="end">
          <InputGroup>
            <VStack>
              <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  size={{ base: "sm", md: "md" }}
                />
              </FormControl>
              <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  size={{ base: "sm", md: "md" }}
                />
              </FormControl>
            </VStack>
          </InputGroup>

          <ButtonGroup
            display="flex"
            flexDir="column"
            gap={1}
            alignItems="flex-end"
            justifyContent="center"
          >
            <Button
              onClick={previewAsGuest}
              isLoading={guestLoginLoading}
              animation={glowAnimation}
              size={{ base: "sm", md: "md"}}
            >Demo
            </Button>
            <Button
              type="submit"
              isLoading={loginLoading}
              size={{ base: "sm", md: "md"}}
            >Log In
            </Button>
          </ButtonGroup>

        </HStack>

      </form>
    </Box>
  )
}

export default Login