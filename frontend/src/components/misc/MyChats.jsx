import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react"
import  axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from "../ChatLoading"
import { getSender } from "../../config/ChatLogic"
import GroupChatModal from './GroupChatModal'

const MyChats = ({fetchAgain}) => {
  const [ loggedUser, setLoggedUser ]=useState("")
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

        const {data}=await axios.get("/api/chat", config)
        // console.log(data)

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

  useEffect(()=>{
          // const fetchChats=async()=>{
        
          //   //  try {
                
          //       //setLoading(true);
          //       const config={
          //           headers: {
          //               Authorization: `Bearer ${user.token}`
          //           }
          //       }
        
          //       const {data}= await axios.get("/api/chat", config)
          //       console.log(data)
        
          //       setChats(data)
                //setLoading(false);
        
                
            //  } 
            // catch (error) {
            //     toast({
            //         title:"Error Occured",
            //         description: "Failed to load the chats",
            //         status:"Error",
            //         duration: 5000,
            //         isClosable: true,
            //         position: "top-right",
            //     })
            // }
        
        
          // }
          setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats()
      },[fetchAgain])
      // console.log(chats)
  return (
    <Box display={{ base: selectedChat ? "none" : "flex", md: "flex" }} flexDir="column" alignItems="center" p={3} bg="#F2D1D1" w={{ base: "100%", md: "31%" }}
      borderRadius="lg" borderWidth="1px">
        <Box pb={3} px={3} fontSize={{ base: "28px", md: "30px" }} display="flex" w="100%" justifyContent="space-between" alignItems="center">
          My Chats
          <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
        </Box>
        <Box display="flex" flexDir="column" p={3} bg="#FFE6E6" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
          {chats?(
            <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#A91079" : "#E9D5CA"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
                </Box>))}
                </Stack>
          ):(<ChatLoading />)}
        </Box>
      </Box>
  )
}

export default MyChats