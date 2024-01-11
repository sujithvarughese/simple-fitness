import { TabIndicator, TabList, TabPanels, TabPanel, Tabs, Tab, Container } from '@chakra-ui/react'

import Search from './Search.jsx'
import Browse from './Browse.jsx'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import UserDashboard from './UserDashboard.jsx'
const FindWorkouts = ({ onSetSearchFields, setResults, clear }) => {

  const { user } = useGlobalContext()

  return (
      <Container>
        <Tabs
          isLazy
          onChange={clear}
          variant="enclosed"
          isFitted
        >
          <TabList>
            {user && <Tab>Favorites</Tab>}
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
            {
              user &&
              <TabPanel>
                <UserDashboard setResults={setResults} clear={clear}/>
              </TabPanel>
            }

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