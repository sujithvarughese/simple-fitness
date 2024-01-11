import { TabIndicator, TabList, TabPanels, TabPanel, Tabs, Tab, Container } from '@chakra-ui/react'

import Search from './Search.jsx'
import Browse from './Browse.jsx'
import Favorites from './Favorites.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
const FindWorkouts = ({ onSetSearchFields, setResults, clear }) => {

  return (
      <Container>
        <Tabs
          isLazy isFitted
          onChange={clear}
          variant="enclosed"
        >
          <TabList>
            <Tab>Favorites</Tab>
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
              <Favorites setResults={setResults}/>
            </TabPanel>

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