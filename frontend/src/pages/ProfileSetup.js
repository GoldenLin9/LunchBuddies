// src/pages/ProfileSetup.js
import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  IconButton,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import TabsSelection from '../components/TabsSelection';

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleInterestSelect = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleHobbySelect = (hobby) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSkip = () => {
    if (step === 1) {
      setStep(2);
    } else {
      toast({
        title: 'Profile setup successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      navigate('/'); // Navigate to home page
    }
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      toast({
        title: 'Profile setup successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      navigate('/'); // Navigate to home page
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  return (
    <Box maxW="container.sm" mx="auto" py={10}>
      <VStack spacing={6}>
        <Heading>Profile Setup</Heading>
        {step === 1 && (
          <>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Major</FormLabel>
              <Input value={major} onChange={(e) => setMajor(e.target.value)} />
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
            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </FormControl>
            <IconButton
              colorScheme="blue"
              mt={4}
              icon={<ArrowForwardIcon />}
              onClick={handleContinue}
              aria-label="Continue"
            />
            <Button variant="outline" mt={4} onClick={handleSkip}>
              Skip
            </Button>
          </>
        )}
        {step === 2 && (
          <>
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
            <Flex mt={4} justifyContent="space-between" w="full">
              <IconButton
                colorScheme="blue"
                icon={<ArrowBackIcon />}
                onClick={handleBack}
                aria-label="Back"
              />
              <IconButton
                colorScheme="blue"
                icon={<ArrowForwardIcon />}
                onClick={handleContinue}
                aria-label="Continue"
              />
            </Flex>
            <Button variant="outline" mt={4} onClick={handleSkip}>
              Skip
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ProfileSetup;
