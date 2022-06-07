import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
        <Box d="flex" justifyContent="center" p={2} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
            <Text fontSize="4xl" fontWeight="bold" fontFamily="work-sans" m="0 auto">Hi Frens!</Text>
        </Box>
        <Box  p={4} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded'>
            <TabList mb="1em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel> <Login/> </TabPanel>
                <TabPanel> <SignUp/> </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
    </Container>
  )
}

export default Home