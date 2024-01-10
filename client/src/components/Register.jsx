import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Register = () => {

  const { showRegisterModal, setShowRegisterModal, register } = useGlobalContext()

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: ""
    },
    onSubmit: async (values) => {
      register(values)
      formik.resetForm()
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
      password: Yup.string().required("Required"),
      passwordConfirm: Yup.string().required("Required")
    })
  });

  return (
    <Modal isOpen={showRegisterModal} onClose={setShowRegisterModal}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            Register
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <VStack>
                <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName}>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    variant="filled"
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.lastName && formik.touched.lastName}>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    variant="filled"
                  />
                  <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                  <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage>
                </FormControl>

                <Button type="submit">Submit</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default Register