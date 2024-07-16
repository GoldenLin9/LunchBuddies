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
// src/pages/Profile.js
import React, { useState } from 'react';
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
  Tabs,
  TabList,
  Tab,
  Flex,
} from '@chakra-ui/react';

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [interests, setInterests] = useState('Coding, Hiking, Food');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleSave = () => {
    console.log('Saving profile:', { name, email, interests, selectedInterests, selectedHobbies });
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

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Your Profile</Heading>
        <Text fontSize="xl">Name: {name}</Text>
        <Text fontSize="xl">Email: {email}</Text>
        <Text fontSize="xl">Interests: {interests}</Text>
        <Button colorScheme="teal" onClick={onOpen}>Edit Profile</Button>

        <Box mt={8}>
          <Heading size="md">Select Your Interests</Heading>
          <Tabs variant="soft-rounded" colorScheme="teal" mt={4}>
            <TabList>
              <Tab onClick={() => handleInterestSelect('Coding')}>👨‍💻 Coding</Tab>
              <Tab onClick={() => handleInterestSelect('Hiking')}>🥾 Hiking</Tab>
              <Tab onClick={() => handleInterestSelect('Food')}>🍔 Food</Tab>
              <Tab onClick={() => handleInterestSelect('Travel')}>✈️ Travel</Tab>
            </TabList>
          </Tabs>
        </Box>

        <Box mt={4}>
          <Heading size="md">Select Your Hobbies</Heading>
          <Flex mt={4} gap={2}>
            <Button onClick={() => handleHobbySelect('Reading')} colorScheme={selectedHobbies.includes('Reading') ? 'teal' : 'gray'}>
              📚 Reading
            </Button>
            <Button onClick={() => handleHobbySelect('Gardening')} colorScheme={selectedHobbies.includes('Gardening') ? 'teal' : 'gray'}>
              🌼 Gardening
            </Button>
            <Button onClick={() => handleHobbySelect('Gaming')} colorScheme={selectedHobbies.includes('Gaming') ? 'teal' : 'gray'}>
              🎮 Gaming
            </Button>
            <Button onClick={() => handleHobbySelect('Cooking')} colorScheme={selectedHobbies.includes('Cooking') ? 'teal' : 'gray'}>
              🍳 Cooking
            </Button>
          </Flex>
        </Box>
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

