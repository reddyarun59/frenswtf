import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserBadgeItem from './UserAvatar/UserBadgeItem'

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRemove = ()=>{

  }

    return (
        <>
          <IconButton display={{base:"flex"}} onClick={onOpen} icon={<ViewIcon/>}>Open Modal</IconButton>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="35px" display="flex" justifyContent="center">{selectedChat.chatName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <Box>
                    {selectedChat.users.map((u)=>(
                        <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleRemove(u)} />
                    ))}
                  </Box>
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UpdateGroupChatModal