// src/pages/Login.js
import React from 'react';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const Login = () => (
  <Box maxW="container.sm" mx="auto" py={10}>
    <VStack spacing={6}>
      <Heading>Login</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button colorScheme="teal" width="full">Login</Button>
    </VStack>
  </Box>
);

export default Login;
