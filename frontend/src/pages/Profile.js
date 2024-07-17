// // src/pages/Profile.js
// import React, { useState } from 'react';
// import { Box, VStack, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';

// const Profile = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [name, setName] = useState('John Doe');
//   const [email, setEmail] = useState('john@example.com');
//   const [interests, setInterests] = useState('Coding, Hiking, Food');

//   const handleSave = () => {
//     // Here you would typically send this data to your backend
//     console.log('Saving profile:', { name, email, interests });
//     onClose();
//   };

//   return (
//     <Box maxW="container.md" mx="auto" py={10}>
//       <VStack spacing={6} align="stretch">
//         <Heading>Your Profile</Heading>
//         <Text fontSize="xl">Name: {name}</Text>
//         <Text fontSize="xl">Email: {email}</Text>
//         <Text fontSize="xl">Interests: {interests}</Text>
//         <Button colorScheme="teal" onClick={onOpen}>Edit Profile</Button>
//       </VStack>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Profile</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               <Input value={name} onChange={(e) => setName(e.target.value)} />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Email</FormLabel>
//               <Input value={email} onChange={(e) => setEmail(e.target.value)} />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Interests</FormLabel>
//               <Input value={interests} onChange={(e) => setInterests(e.target.value)} />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleSave}>
//               Save
//             </Button>
//             <Button variant="ghost" onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Profile;

// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react';
import TabsSelection from '../components/TabsSelection';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [interests, setInterests] = useState('Coding, Hiking, Food');
  const [hobbies, setHobbies] = useState('Reading, Gardening, Gaming');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [major, setMajor] = useState('Computer Science');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('Male');

  const handleSave = () => {
    console.log('Saving profile:', { name, email, interests, selectedInterests, selectedHobbies, major, age, gender });
    onClose();
  };

  const handleInterestSelect = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleHobbySelect = (hobby) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  useEffect(() => {
    setInterests(selectedInterests.join(', '));
    setHobbies(selectedHobbies.join(', '));
  }, [selectedInterests, selectedHobbies]);

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Your Profile</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Text fontSize="xl">Name: {name}</Text>
            <Text fontSize="xl">Email: {email}</Text>
            <Text fontSize="xl">Interests: {interests}</Text>
            <Text fontSize="xl">Hobbies: {hobbies}</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="xl">Major: {major}</Text>
            <Text fontSize="xl">Age: {age}</Text>
            <Text fontSize="xl">Gender: {gender}</Text>
          </GridItem>
        </Grid>
        <Button colorScheme="teal" w="20%" onClick={onOpen}>Edit Profile</Button>

        <TabsSelection
          title="Select Your Interests"
          options={['Coding', 'Hiking', 'Food', 'Travel']}
          selectedOptions={selectedInterests}
          onOptionSelect={handleInterestSelect}
        />

        <TabsSelection
          title="Select Your Hobbies"
          options={['Reading', 'Gardening', 'Gaming', 'Cooking']}
          selectedOptions={selectedHobbies}
          onOptionSelect={handleHobbySelect}
        />
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
            <FormControl mt={4}>
              <FormLabel>Hobbies</FormLabel>
              <Input value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Major</FormLabel>
              <Input value={major} onChange={(e) => setMajor(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </Select>
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
