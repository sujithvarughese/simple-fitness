import { useFormik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import { useState } from 'react'

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

          <Button
            type="submit"
            isLoading={loginLoading}
            size={{ base: "sm", md: "md"}}

          >Log In
          </Button>
        </HStack>

      </form>
    </Box>
  )
}

export default Login