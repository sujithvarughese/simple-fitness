import { useFormik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext.jsx'

const Login = () => {

  const { login } = useAuthContext()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      login(values)
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
                  size="sm"
                  variant="filled"
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
                  size="sm"
                />
              </FormControl>
            </VStack>
          </InputGroup>

          <Button
            type="submit"
            loadingText="Logging In..."
            width="200px"
          >Log In
          </Button>
        </HStack>

      </form>
    </Box>
  )
}

export default Login