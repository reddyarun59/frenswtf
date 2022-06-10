import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useHistory } from 'react-router-dom';
import './App.css';
import ChatContext, { ChatProvider }  from './Context/ChatProvider';
import Chats from './pages/Chats';
import Home from './pages/Home';


function App() {
  
  // const [user, setUser]=useState("")
  // //const history=useHistory()

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo)

  //   // if(!userInfo){
  //   //   navigate('/')
  //   // }
  //   }, [])



  return (
      <div className="App">
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={Chats} />
    </div>
  );
}

export default App;
