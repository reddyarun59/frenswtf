import React, { useEffect, useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react';
import { getSender, getSenderFull } from '../config/ChatLogic';
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './misc/ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const { user, selectedChat, setSelectedChat}=ChatState();
    const toast=useToast()

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()

    const fetchMessages=async()=>{
      if(!selectedChat){
        return
      }

      try {

        const config={
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        } 

        setLoading(true)
        const { data }= await axios.get(`/api/message/${selectedChat._id}`, config)

        setMessages(data)
        console.log(messages)
        setLoading(false)
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Messages",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }

    useEffect(()=>{
      fetchMessages()

    }, [selectedChat])

    const sendMessage = async(event)=>{
      if(event.key==="Enter" && newMessage){
        try {
          
          const config = {
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`
            }
          }

          setNewMessage("")
          const { data }=await axios.post("/api/message", {
            content:newMessage,
            chatId:selectedChat._id
          }, config)
          console.log(data)
          setMessages((prevstate)=>[...prevstate, data])
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: "Failed to send the Message",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    }

    const typingHandler=(e)=>{
      setNewMessage(e.target.value)
    }
  return (
    <>
    {selectedChat? (
    <> 
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat? (
                <>{getSender(user, selectedChat.users)}
                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                </>
            ):(
                <>{selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                </>
            )}
            </Text>
            <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
              {loading? (<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto"/>):
              (<div>
                {/* Messages */}
                </div>)}
                <FormControl onKeyDown={sendMessage} mt={3} isRequired>
                  <Input varient="filled" bg="#E0E0E0" placeholder="Enter a Message" onChange={typingHandler} value={newMessage}/>
                </FormControl>
            </Box>
        </>
    ):(
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
    )}
    </>
  )
}

export default SingleChat