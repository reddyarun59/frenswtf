import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import  ChatContext, { ChatState }  from '../Context/ChatProvider'

const Chats = () => {

    const [user, setUser]= useState("")

    // const [chats, setChats]=useState([])

    // const fetchChats=async()=>{
    //     const {data}=await axios.get("/api/chat")
    //     setChats(data)
    //     console.log(data)
    // }

    // useEffect(()=>{
    //     fetchChats()
    // },[])

    //const { user } = ChatState();
    //console.log(user)
  return (
      <div>
          {/* {chats.map(chat=>(<h1 key={chat._id}>{chat.chatName}</h1>))} */}
          {user.email}
      </div>
  )
}

export default Chats