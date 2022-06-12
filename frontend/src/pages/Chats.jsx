import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import  ChatContext, { ChatState }  from '../Context/ChatProvider'
import { Box } from "@chakra-ui/react"
import SideDrawer from '../components/misc/SideDrawer'
import MyChats from '../components/misc/MyChats'
import ChatBox from '../components/misc/ChatBox'

const Chats = () => {

  const [fetchAgain, setFetchAgain] = useState(false);

    const { user } = ChatState();

    console.log(user)

    
  return (
      <div style={{width:"100%"}}>
        {user&&<SideDrawer/>}
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain}/>}
        { user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
      </div>
  )
}

export default Chats