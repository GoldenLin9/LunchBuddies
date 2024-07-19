import React, { useState, useContext } from 'react';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, HStack, Text } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Login() {
  let { login } = useContext(AuthContext);
  
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  const navigate = useNavigate();

  let updateLogin = (e) => {
    setUsername(e.target.value);
  }

  let updatePassword = (e) => {
    setPassword(e.target.value);
  }
  
  function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission
    login(username, password);
  }

  return (
    <Box maxW="container.sm" mx="auto" py={10}>
      <form onSubmit={handleLogin}>
        <VStack spacing={6}>
          <Heading>Login</Heading>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={updateLogin} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={updatePassword} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Login</Button>
          <HStack>
            <Text>Don't have an account?</Text>
            <Button as={Link} to="/register" variant="link" colorScheme="teal">
              Register
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
}
