import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    const [formData, setFormData] =useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        pic:"",
    })

    const [show, setShow] = useState(false)
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

    const postDetails=()=>{

    }

    const submitHandler=()=>{
        
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

        <Button colorScheme="blue" width="100%" style={{marginTop:"15px"}} onClick={submitHandler}>
            Sign Up
        </Button>
    </VStack>
  )
}

export default SignUp