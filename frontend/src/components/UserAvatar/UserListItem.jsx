import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user, handleFunction}) => {
  return (
    <Box onClick={handleFunction} cursor="pointer" bg="#F2D1D1" _hover={{background: "#7C3E66",color: "white",}} w="100%" display="flex" alignItems="center"
    color="black" px={3} py={2} mb={2} borderRadius="lg">

      <Avatar mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />

      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs"><b>Email : </b> {user.email}</Text>
      </Box>
    </Box>
  )
}

export default UserListItem