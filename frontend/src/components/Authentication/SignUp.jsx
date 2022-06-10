import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react"
import axios from 'axios'
import { useHistory } from "react-router-dom";

const SignUp = () => {

    const history=useHistory()
    const toast=useToast()
    const [formData, setFormData] =useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        pic:"",
    })

    const [show, setShow] = useState(false)

    const [loading, setLoading]=useState(false)
    const { name, email, password, confirmPassword, pic} = formData

    const handleChange=(e)=>{
        setFormData(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleClick=()=>{
        setShow(prevState=>!prevState)
    }

    const postDetails=(pics)=>{
        setLoading(true)
        if(pics===undefined){
            toast({
                title:"Please Select an Image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'top-right'
            })
            return;
        }

        if(pics.type==="image/jpeg"||"image/png"){
            const data=new FormData()
            data.append("file",pics)
            data.append("upload_preset","bubblewtf")
            data.append("cloud_name", "reddyarun59")
            fetch("https://api.cloudinary.com/v1_1/reddyarun59/image/upload", {
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
                setFormData(prevState=>({
                    ...prevState,
                    pic:data.url.toString()
                }))
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
                setLoading(false)
            })
            
        }else{
            toast({
                title:"Please Select an Image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'top-right'
            })
            return;
        }

    }

    const submitHandler=async()=>{
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }

        try {
            const config={
                header:{
                    "Content-type":"application/json"
                }
            }

            const {data} = await axios.post("/api/user/", {name, email, password, pic}, config)
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
              history.push("/chats")
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
        console.log(formData)
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
        <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input type={show?"text":"password"} placeholder="Enter Password Again" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <InputRightElement width="4.5rem"><Button height="1.75rem" size="sm" onClick={handleClick}>{show?"Hide":"Show"}</Button></InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input type="file" p={1.5} accept="image/*" onChange={(e)=>postDetails(e.target.files[0])}/>
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{marginTop:"15px"}} onClick={submitHandler} isLoading={loading}>
            Sign Up
        </Button>
    </VStack>
  )
}

export default SignUp