import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import  ChatContext, { ChatState }  from '../Context/ChatProvider'
import { Box } from "@chakra-ui/layout"
import SideDrawer from '../components/misc/SideDrawer'
import MyChats from '../components/misc/MyChats'
import ChatBox from '../components/misc/ChatBox'

const Chats = () => {

    const { user } = ChatState();

    console.log(user)

    
  return (
      <div style={{width:"100%"}}>
        {user&&<SideDrawer/>}
        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats/>}
        { user && <ChatBox/>}
        </Box>
      </div>
  )
}

export default Chats