import { TabList, TabPanels, TabPanel, Tabs, Tab, Container } from '@chakra-ui/react'

import Search from './Search.jsx'
import Browse from './Browse.jsx'
const FindWorkouts = ({ onSetSearchFields, clear }) => {

  return (
      <Container>
        <Tabs onChange={clear}>

          <TabList>
            <Tab>Browse</Tab>
            <Tab>Search</Tab>
          </TabList>

          <TabPanels>

            <TabPanel>
              <Browse onSetSearchFields={onSetSearchFields}/>
            </TabPanel>

            <TabPanel>
              <Search onSetSearchFields={onSetSearchFields}/>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Container>


  )
}

export default FindWorkouts