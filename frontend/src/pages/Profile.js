// src/pages/Profile.js
import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [interests, setInterests] = useState('Coding, Hiking, Food');

  const handleSave = () => {
    // Here you would typically send this data to your backend
    console.log('Saving profile:', { name, email, interests });
    onClose();
  };

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Your Profile</Heading>
        <Text fontSize="xl">Name: {name}</Text>
        <Text fontSize="xl">Email: {email}</Text>
        <Text fontSize="xl">Interests: {interests}</Text>
        <Button colorScheme="teal" onClick={onOpen}>Edit Profile</Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Interests</FormLabel>
              <Input value={interests} onChange={(e) => setInterests(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
