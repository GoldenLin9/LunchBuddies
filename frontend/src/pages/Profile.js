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
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
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
import useAxios from '../hooks/useAxios';

const Profile = () => {

  let { user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [year, setYear] = useState();
  const [interests, setInterests] = useState('Coding, Hiking, Food');
  const [hobbies, setHobbies] = useState('Reading, Gardening, Gaming');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [major, setMajor] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  const [newUser, setNewUser] = useState({});
  
  let api = useAxios();
  const handleSave = () => {
    console.log('Saving profile:', { username, interests, selectedInterests, selectedHobbies, major, age, gender });


    api.put('user/', {
      username: username,
      age: parseInt(age),
      major: major,
      bio: bio,
      year: parseInt(year),
      gender: gender
    }).then((response) => {
      console.log('API response:', response.data);

      setNewUser({
        username: username,
        age: age,
        major: major,
        bio: bio,
        year: year,
        gender: gender
      });
    }).catch((error) => {
      console.error('API error:', error);
    });

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

    api.get(`get-user/${user.user_id}`)
      .then((response) => {
        console.log('API response:', response.data);
        setNewUser(response.data);

        setUsername(response.data.username);
        setBio(response.data.bio);
        setYear(response.data.year);
        setMajor(response.data.major);
        setAge(response.data.age);
        setGender(response.data.gender)
      })

    setInterests(selectedInterests.join(', '));
    setHobbies(selectedHobbies.join(', '));
  }, [selectedInterests, selectedHobbies]);

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Your Profile</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Text fontSize="xl">Name: {newUser.username}</Text>
            <Text fontSize="xl">Age: {newUser.age}</Text>
            {/* <Text fontSize="xl">Interests: {newUser.interests}</Text>
            <Text fontSize="xl">Hobbies: {newUser.hobbies}</Text> */}
          </GridItem>
          <GridItem>
            <Text fontSize="xl">Major: {newUser.major}</Text>
            <Text fontSize="xl">Gender: {newUser.gender}</Text>
          </GridItem>
        </Grid>
        <Text fontSize="xl">Bio: {newUser.bio}</Text>
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
              <Input value={username} onChange = {(e) => setUsername(e.target.value)}/>
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel>Interests</FormLabel>
              <Input value={interests} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Hobbies</FormLabel>
              <Input value={hobbies} />
            </FormControl> */}
            <FormControl mt={4}>
              <FormLabel>Major</FormLabel>
              <Input value={major} onChange = {(e) => setMajor(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input value={bio} onChange = {(e) => setBio(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <Input type="number" value={age} onChange = {(e) => setAge(e.target.value)}/>
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
