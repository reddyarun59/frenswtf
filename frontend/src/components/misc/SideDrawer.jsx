import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Text } from '@chakra-ui/layout'
import { Avatar, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FaSearch } from 'react-icons/fa';
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
//import { useDisclosure } from '@chakra-ui/react'

const SideDrawer = () => {
    const toast=useToast()
    const { user, setSelectedChat } = ChatState();
    const history =useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [search, setSearch]=useState("")
    const [searchResult, setSearchResult]=useState([])
    const [loading, setLoading]=useState(false)
    const [loadingChat, setLoadingChat]=useState()

    const logoutHandler=()=>{
        localStorage.removeItem("userInfo")
        history.push("/")
    }

    const handleSearch=async()=>{
        if(!search){
            toast({
                title:"Please Enter Something for Search",
                status:"warning",
                duration:5000,
                isClosable: true,
                position:"top right"
            })
            return
        }

        try {
           setLoading(true) 

           const config={
               headers:{
                   Authorization: `Bearer ${user.token}`
               }
           }

           const {data}=await axios.get(`/api/user?search=${search}`, config)

           setLoading(false)
           setSearchResult(data)
        } catch (error) {
            toast({
                title:"Error Occured",
                description: "Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
        }
    }

    const accessChat=async(userId)=>{

        try {
            
            setLoading(true);
            const config={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data}= await axios.post("/ap/chat", {userId}, config)

            setSelectedChat(data)
            setLoading(false);
            onClose()
        } catch (error) {
            
        }

    }
  return (
    <>
        <Box display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
            <Tooltip label="Search users to Chat" hasArrow placement="bottom-end">
                <Button varient="ghost" onClick={onOpen}>
                <FaSearch/>
                <Text display={{base:"none", md:"flex"}} px="4">
                    Search User
                </Text>
                </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
                Frens
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize="2xl" margin={1}/>
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider/>
                        <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create your account</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
                <Input placeholder="Search by name or email" mr={2} value={search} onChange={(e)=>setSearch(e.target.value)}  />
                <Button onClick={handleSearch}>
                    GO
                </Button>

            </Box>
            {loading?<ChatLoading/>
            :(
                searchResult?.map((user)=>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)} />
                ))
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer