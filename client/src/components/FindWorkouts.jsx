import { TabList, TabPanels, TabPanel, Tabs, Tab, VStack, FormControl, FormLabel, Select, Button, Input, FormErrorMessage } from '@chakra-ui/react'
import { bodyPartsListSelect, compoundBodyPartsListSelect, equipmentListSelect, levelListSelect } from '../data.js'
import workoutNamesListSelect from '../../workoutNames.js'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';
import Search from './Search.jsx'
import Browse from './Browse.jsx'
const FindWorkouts = ({ onSetSearchFields, clear }) => {

  return (

      <Tabs onChange={clear}>
        <TabList>
          <Tab>Browse</Tab>
          <Tab>Search</Tab>
        </TabList>

        <TabPanels>
          <Browse
            onSetSearchFields={onSetSearchFields}
          />
          <Search
            onSetSearchFields={onSetSearchFields}
          />
        </TabPanels>
      </Tabs>

  )
}

export default FindWorkouts