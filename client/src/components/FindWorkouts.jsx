import { TabList, TabPanels, TabPanel, Tabs, Tab, VStack, FormControl, FormLabel, Select, Button, Input, FormErrorMessage } from '@chakra-ui/react'
import { bodyPartsListSelect, compoundBodyPartsListSelect, equipmentListSelect, levelListSelect } from '../data.js'
import workoutNamesListSelect from '../../workoutNames.js'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';
const FindWorkouts = ({ setWorkouts }) => {


  const formikBrowse = useFormik({
    initialValues: {
      bodyPart: "",
      compoundBodyPart: "",
      equipment: "",
      level: ""
    },
    onSubmit: (values) => {
      formikBrowse.resetForm()
    },
    validationSchema: Yup.object({
      bodyPart: Yup.string().required("Required"),
      equipment: Yup.string().required("Required"),
    })
  })

  const formikSearch = useFormik({
    initialValues: {
      query: ""
    },
    onSubmit: (values) => {

    },
    validationSchema: Yup.object({
      query: Yup.string().required("Required")
    })
  })
/*
  const queriedWorkoutNames = workoutNamesListSelect.filter(name => {
    return 	name.toLowerCase().includes(formikSearch.values.query.toLowerCase())
  })
*/
  return (

      <Tabs>
        <TabList>
          <Tab>Browse</Tab>
          <Tab>Search</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>

            <form>
              <VStack>
                <FormControl>
                  <FormLabel htmlFor="bodyPart">Target Body Part</FormLabel>
                    <Select
                      name="bodyPart"
                      id="bodyPart"
                      type="text"
                      onBlur={formikBrowse.handleBlur}
                      value={formikBrowse.values.bodyPart}
                      onChange={formikBrowse.handleChange}
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
                    onBlur={formikBrowse.handleBlur}
                    value={formikBrowse.values.equipment}
                    onChange={formikBrowse.handleChange}
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
                    onBlur={formikBrowse.handleBlur}
                    value={formikBrowse.values.level}
                    onChange={formikBrowse.handleChange}
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

          <TabPanel>
            <FormControl isInvalid={formikSearch.errors.query && formikSearch.touched.query}>
              <FormLabel htmlFor="firstName">Name</FormLabel>

              <CreatableSelect

                id="query"
                name="query"
                type="text"
                onBlur={formikSearch.handleBlur}
                value={formikSearch.values.query}
                onChange={formikSearch.handleChange}
                options={workoutNamesListSelect}
              >
              </CreatableSelect>
              <FormErrorMessage>{formikSearch.errors.query}</FormErrorMessage>
            </FormControl>

            {/*
              queriedWorkoutNames.length > 0 && formikSearch.values.query.length > 3 &&
              queriedWorkoutNames.map((name, index) => <div key={index}>{name}</div>)
            */}
          </TabPanel>


        </TabPanels>

      </Tabs>

  )
}

export default FindWorkouts