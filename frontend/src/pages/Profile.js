// src/pages/Profile.js
import React from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';

const Profile = () => (
  <Box maxW="container.md" mx="auto" py={10}>
    <VStack spacing={6} align="stretch">
      <Heading>Your Profile</Heading>
      <Text fontSize="xl">Name: John Doe</Text>
      <Text fontSize="xl">Email: john@example.com</Text>
      <Text fontSize="xl">Interests: Coding, Hiking, Food</Text>
      <Button colorScheme="teal">Edit Profile</Button>
    </VStack>
  </Box>
);

export default Profile;
