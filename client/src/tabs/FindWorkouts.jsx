import { TabIndicator, TabList, TabPanels, TabPanel, Tabs, Tab, Container, SimpleGrid } from '@chakra-ui/react'
import Search from './Search.jsx'
import Browse from './Browse.jsx'
import Favorites from './Favorites.jsx'
import Curate from './Curate.jsx'

// root component for tabbed search section using chakra tab layout
const FindWorkouts = ({ onSetSearchFields, setResults, clear }) => {

  return (
        <Tabs
          isLazy isFitted
          onChange={clear}
          variant="enclosed-colored"
          marginBottom="2"
        >
          <TabList>
            <Tab borderTopRadius="7px" fontWeight="700">Favorites</Tab>
            <Tab borderTopRadius="7px" fontWeight="700">Browse</Tab>
            <Tab borderTopRadius="7px" fontWeight="700">Search</Tab>
            <Tab borderTopRadius="7px" fontWeight="700">Curate</Tab>
          </TabList>

          <Container>
            <TabPanels>
              <TabPanel>
                <Favorites setResults={setResults}/>
              </TabPanel>

              <TabPanel>
                <Browse onSetSearchFields={onSetSearchFields} setResults={setResults}/>
              </TabPanel>

              <TabPanel>
                <Search onSetSearchFields={onSetSearchFields}/>
              </TabPanel>

              <TabPanel>
                <Curate onSetSearchFields={onSetSearchFields}/>
              </TabPanel>
            </TabPanels>
          </Container>
        </Tabs>



  )
}

export default FindWorkouts