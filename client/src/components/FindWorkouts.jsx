import { TabIndicator, TabList, TabPanels, TabPanel, Tabs, Tab, Container } from '@chakra-ui/react'

import Search from './Search.jsx'
import Browse from './Browse.jsx'
const FindWorkouts = ({ onSetSearchFields, clear }) => {

  return (
      <Container >
        <Tabs onChange={clear} variant="enclosed" isFitted>

          <TabList>
            <Tab>Browse</Tab>
            <Tab>Search</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="red.500"
            borderRadius="1px"


          />
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