// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import AuthContext from '../context/AuthContext';



export default function Login() {

  let { login } = useContext(AuthContext);

  

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');


  let updateLogin = (e) => {
    setUsername(e.target.value);
  }

  let updatePassword = (e) => {
    setPassword(e.target.value);
  }

  
  function handleLogin() {
    login(username, password);
  }


  return <>

    <Box maxW="container.sm" mx="auto" py={10}>
      <VStack spacing={6}>
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>username</FormLabel>
          <Input type="username" onChange = {updateLogin}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" onChange = {updatePassword}/>
        </FormControl>
        <Button colorScheme="teal" width="full" onClick = {handleLogin}>Login</Button>
      </VStack>
    </Box>
  
  </>
};
