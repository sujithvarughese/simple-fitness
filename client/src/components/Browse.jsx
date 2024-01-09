import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TabPanel,  VStack, FormControl, FormLabel, Select, Button } from '@chakra-ui/react'
import { bodyPartsListSelect, equipmentListSelect, levelListSelect } from '../data.js'
const Browse = () => {

  const handleSubmit = values => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues: {
      bodyPart: "",
      compoundBodyPart: "",
      equipment: "",
      level: ""
    },
    onSubmit: (values) => {
      handleSubmit(values)
      formik.resetForm()
    },
    validationSchema: Yup.object({
      bodyPart: Yup.string().required("Required"),
      equipment: Yup.string().required("Required"),
    })
  })

  return (
    <TabPanel>
      <form>
        <VStack>
          <FormControl>
            <FormLabel htmlFor="bodyPart">Target Body Part</FormLabel>
            <Select
              name="bodyPart"
              id="bodyPart"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.bodyPart}
              onChange={formik.handleChange}
            >
              {
                bodyPartsListSelect.map((bodyPart, index) => {
                  return (
                    <option key={index} value={bodyPart.value}>{bodyPart.label}</option>
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
                levelListSelect?.map((level, index) => {
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

export default Browse