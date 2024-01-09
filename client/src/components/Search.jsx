import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormLabel, TabPanel, Input, FormErrorMessage } from '@chakra-ui/react'

const workoutNames = ["arm", "leg", "back"]
const Search = () => {

  const handleSubmit = values => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues: {
      query: ""
    },
    onSubmit: (values) => {
      handleSubmit(values)
      formik.resetForm()
    },
    validationSchema: Yup.object({
      query: Yup.string().required("Required"),
    })
  })

  const queriedWorkoutNames = workoutNames.filter(name => {
    return 	name.toLowerCase().includes(formik.values.query.toLowerCase())
  })

  return (
    <TabPanel>
      <FormControl isInvalid={formik.errors.query && formik.touched.query}>
        <FormLabel htmlFor="firstName">Name</FormLabel>
        <Input
          id="firstName"
          name="firstName"
          {...formik.getFieldProps("firstName")}
        />
        <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
      </FormControl>
    </TabPanel>
  )
}

export default Search