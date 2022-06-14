import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import {ChatContext, ChatState} from '../Context/ChatProvider'

const Home = () => {

    const history = useHistory();
    const {setUser}=ChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    
    if (user){ history.push("/chats")};
    //setUser(user);
    
  }, [history]);
    
  return (
    <Container maxW="xl" centerContent>
        <Box display="flex" justifyContent="center" p={2} bg="" w="100%" m="40px 0 15px 0">
            <Text fontSize="4xl" fontWeight="bold" fontFamily="work-sans" m="0 auto" color="#1B2430">Hi Frennss!</Text>
        </Box>
        <Box  p={4} bg="#FFF8F3" w="100%" borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' color="#1B2430">
            <TabList mb="1em" color="#1B2430">
                <Tab width="50%" color="#1B2430">Login</Tab>
                <Tab width="50%" color="#1B2430">Sign Up</Tab>
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