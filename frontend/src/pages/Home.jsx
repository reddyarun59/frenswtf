import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import {ChatContext} from '../Context/ChatProvider'

const Home = () => {

    const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user){ history.push("/chats")};
  }, [history]);
    
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