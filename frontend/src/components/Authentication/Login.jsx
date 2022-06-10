import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import {useHistory} from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import axios from 'axios'

const Login = () => {
    const history=useHistory()
    const toast=useToast()
    const [formData, setFormData] =useState({
        name:"",
        email:"",
        password:"",
    })
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const { name, email, password } = formData

    const handleChange=(e)=>{
        setFormData(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleClick=()=>{
        setShow(prevState=>!prevState)
    }


    const submitHandler=async()=>{
        
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
    }

  return (
    <VStack spacing="5px">
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Enter your Name" onChange={handleChange} name="name" value={name}/>
        </FormControl>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your Email" onChange={handleChange} name="email" value={email}/>
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={show?"text":"password"} placeholder="Enter your Password" onChange={handleChange} name="password" value={password}/>
                <InputRightElement width="4.5rem"><Button height="1.75rem" size="sm" onClick={handleClick}>{show?"Hide":"Show"}</Button></InputRightElement>
            </InputGroup>
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{marginTop:"15px"}} onClick={submitHandler}>
            Sign In
        </Button>
        <Button varient="solid" colorScheme="red" width="100%" style={{marginTop:"15px"}} onClick={()=>setFormData(prevState=>({email:"test@gmail.com",password:"test123"}))}>
            Get Guest User Credentials
        </Button>
    </VStack>
  )
}

export default Login