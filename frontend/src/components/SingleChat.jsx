import React, { useEffect, useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text, Spinner, FormControl, Input, useToast } from '@chakra-ui/react';
import { getSender, getSenderFull } from '../config/ChatLogic';
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './misc/ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import ViewChats from './ViewChats';
import io from "socket.io-client"
//import Lottie  from "react-lottie"
import animationData from "../animations/typing.json"

const ENDPOINT="https://frenschat.herokuapp.com/"

let socket;
let selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const { user, selectedChat, setSelectedChat, notification, setNotification } =ChatState();
    const toast=useToast()

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping]=useState(false)
    const [isTyping, setIsTyping] = useState(false)

    // const defaultOptions={
    //   loop: true,
    //   autoplay: true,
    //   animationData:animationData,
    //   renderSettings:{
    //     preserveAspectRatio: "xMidYMid slice"
    //   }
    // }

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
        //console.log(messages)
        setLoading(false)

        socket.emit("join chat", selectedChat._id)
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
      socket=io(ENDPOINT)

      socket.emit("setup", user)
      socket.on("connected", ()=>setSocketConnected(true))

      socket.on("typing", ()=>setIsTyping(true))
      socket.on("stop typing", ()=>setIsTyping(false))
    },[])

    useEffect(()=>{
      fetchMessages()

      selectedChatCompare=selectedChat;

    }, [selectedChat])

    useEffect(()=>{

      socket.on("message received", (newMessageReceived)=>{
        if(!selectedChatCompare|| selectedChatCompare._id !== newMessageReceived.chat._id){
          
          if(!notification.includes(newMessageReceived)){
            setNotification([newMessageReceived, ...notification])
            setFetchAgain(prevstate=>!prevstate)
          }

        }else{
          setMessages([...messages, newMessageReceived])
        }
      })
    })
    const sendMessage = async(event)=>{
      if(event.key==="Enter" && newMessage){
        socket.emit("stop typing", selectedChat._id)
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
          // console.log(data)

          socket.emit("new message", data)
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

      if(!socketConnected){
        return
      }

      if(!typing){
        setTyping(true)
        socket.emit("typing", selectedChat._id)
      }

      let lastTypingTime = new Date().getTime()
      let timerLength=3000

      setTimeout(()=>{

        let timeNow=new Date().getTime()
        let timeDiff = timeNow - lastTypingTime

        if(timeDiff >= timerLength&&typing){
          socket.emit("stop typing", selectedChat._id)
          setTyping(false)
        }
      }, timerLength)
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
                    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>
                </>
            )}
            </Text>
            <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#FFE6E6" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
              {loading? (<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto"/>):
              (<div>
                <ViewChats messages={messages}/>
                </div>)}
                <FormControl onKeyDown={sendMessage} mt={3} isRequired>
                  {isTyping?<div>
                    {/* <Lottie options={defaultOptions} width={70} style={{marginBottom:"15px", marginLeft:"0"}}/> */}
                    Typing...
                  </div>:<></>}
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