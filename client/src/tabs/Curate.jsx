import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, FormControl, FormLabel, Select, TabPanel, VStack } from '@chakra-ui/react'
import { compoundBodyPartsListSelect, equipmentListSelect, levelListSelect } from '../data.js'

const Curate = () => {
  const handleSubmit = values => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues: {
      compoundBodyPart: "",
      equipment: "",
      level: "",
      time: ""
    },
    onSubmit: (values) => {
      handleSubmit(values)
      formik.resetForm()
    },
    validationSchema: Yup.object({
      compoundBodyPart: Yup.string().required("Required"),
      equipment: Yup.string().required("Required"),
      time: Yup.string().required("Required"),
    })
  })
  return (
    <TabPanel>
      <form>
        <VStack>
          <FormControl>
            <FormLabel htmlFor="compoundBodyPart">Target Body Part</FormLabel>
            <Select
              name="compoundBodyPart"
              id="compoundBodyPart"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.compoundBodyPart}
              onChange={formik.handleChange}
            >
              {
                compoundBodyPartsListSelect.map((compoundBodyPart, index) => {
                  return (
                    <option key={index} value={compoundBodyPart.value}>{compoundBodyPart.label}</option>
                  )
                })
              }
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="equipment">Equipment</FormLabel>
            <Select
              name="equipment"
              id="equipment"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.equipment}
              onChange={formik.handleChange}
            >
              {
                equipmentListSelect.map((equipment, index) => {
                  return (
                    <option key={index} value={equipment.value}>{equipment.label}</option>
                  )
                })
              }
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="bodyPart">Experience Level</FormLabel>
            <Select
              name="level"
              id="level"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.level}
              onChange={formik.handleChange}
            >
              {
                levelListSelect.map((level, index) => {
                  return (
                    <option key={index} value={level.value}>{level.label}</option>
                  )
                })
              }
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </TabPanel>
  )
}

export default Curate