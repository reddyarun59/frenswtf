import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useToast } from "@chakra-ui/react"
import { axios } from 'axios'

const MyChats = () => {
  const [ loggedUser, setLoggedUser ]=useState()
  const { user, chats, setChats, selectedChat, setSelectedChat}= ChatState();
  const toast =useToast()

  const fetchChats=async()=>{

    try {
        
        //setLoading(true);
        const config={
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data}= await axios.get("/api/chat", config)

        setChats(data)
        //setLoading(false);
    } catch (error) {
        toast({
            title:"Error Occured",
            description: "Failed to load the chats",
            status:"Error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
        })
    }

}
  return (
    <div>MyChats</div>
  )
}

export default MyChats