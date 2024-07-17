// src/pages/Register.js
import React, { useState, useContext } from 'react';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';


export default function Register() {

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  let { register } = useContext(AuthContext);


  let updateUsername = (e) => {
    setUsername(e.target.value);
    console.log("UPDATED")
  }

  let updatePassword = (e) => {
    setPassword(e.target.value);
  }

  function handleRegister() {
    register(username, password);
  }


  return <>

    <Box maxW="container.sm" mx="auto" py={10}>
      <VStack spacing={6}>
        <Heading>Register</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" onChange = {updateUsername}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" onChange = {updatePassword}/>
        </FormControl>
        <Button colorScheme="teal" width="full" onClick = {handleRegister}>Register</Button>
      </VStack>
    </Box>
  
  </>

};
