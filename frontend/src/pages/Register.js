<<<<<<< Updated upstream
// src/pages/Register.js
import React, { useState, useContext } from 'react';
=======
// // src/pages/Register.js
// import React from 'react';
// import { Box, VStack, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

// const Register = () => (
//   <Box maxW="container.sm" mx="auto" py={10}>
//     <VStack spacing={6}>
//       <Heading>Register</Heading>
//       <FormControl>
//         <FormLabel>Name</FormLabel>
//         <Input type="text" />
//       </FormControl>
//       <FormControl>
//         <FormLabel>Email</FormLabel>
//         <Input type="email" />
//       </FormControl>
//       <FormControl>
//         <FormLabel>Password</FormLabel>
//         <Input type="password" />
//       </FormControl>
//       <Button colorScheme="teal" width="full">Register</Button>
//     </VStack>
//   </Box>
// );

// export default Register;

import React from 'react';
>>>>>>> Stashed changes
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

<<<<<<< Updated upstream
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
=======
const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // You can add validation or state management here
    navigate('/profile-setup');
  };

  return (
    <Box maxW="container.sm" mx="auto" py={10}>
      <VStack spacing={6}>
        <Heading>Register</Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleRegister}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;

>>>>>>> Stashed changes
