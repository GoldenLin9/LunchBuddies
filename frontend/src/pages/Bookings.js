// src/pages/Bookings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import useAxios from '../hooks/useAxios'

import {
  Box,
  VStack,
  Heading,
  SimpleGrid,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useToast,
  Stack,
  Select,
} from '@chakra-ui/react';
import BookingCard from '../components/BookingCard';

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const toast = useToast();
  const [bookings, setBookings] = useState([
    { title: "Tech Lunch", location: "Byte Cafe", time: "12:30 PM" },
    { title: "Casual Meetup", location: "Park Picnic Area", time: "1:00 PM" },
    { title: "Business Networking", location: "Downtown Diner", time: "12:00 PM" },
  ]);
  const [newBooking, setNewBooking] = useState({ title: "", location: "", time: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setBookings((prev) => [...prev, newBooking]);
    setNewBooking({ title: "", location: "", time: "" });
    onClose();
  };

  let api = useAxios();

  useEffect(()=>{
   // axios.get('http://localhost:8000/api/books').then((response)=>{console.log("success", response)});
    
    api.get('books').then((response)=>{console.log("success", response)});

  }, []);

  return (
    <Box maxW="container.xl" mx="auto" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Lunch Meetups</Heading>
        
        <Stack direction={["column", "column", "row"]} spacing={4}>
          <Select 
            placeholder="Filter by location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Byte Cafe">Byte Cafe</option>
            <option value="Park Picnic Area">Park Picnic Area</option>
            <option value="Downtown Diner">Downtown Diner</option>
          </Select>
          <Input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
          />
          <Button 
            colorScheme="teal" 
            onClick={onOpen}
            width={["100%", "100%", "auto"]}
            flexShrink={0}
          >
            Create New Booking
          </Button>
        </Stack>

        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <BookingCard 
            id="1" 
            title="Tech Lunch" 
            location="Byte Cafe" 
            time="12:30 PM" 
            date="2024-07-16"
            participants={["John", "Alice", "Bob"]}
            description="Join us for a lunch discussion about the latest tech trends!"
          />
          <BookingCard 
            id="2" 
            title="Casual Meetup" 
            location="Park Picnic Area" 
            time="1:00 PM" 
            date="2024-07-17"
            participants={["Emma", "Michael"]}
            description="Relaxed outdoor lunch. Bring your own food!"
          />
          <BookingCard 
            id="3" 
            title="Business Networking" 
            location="Downtown Diner" 
            time="12:00 PM" 
            date="2024-07-18"
            participants={["Sarah", "David", "Lisa", "Tom"]}
            description="Network with local professionals over lunch."
          />
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={newBooking.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
            </FormControl>
            <FormControl id="location" mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={newBooking.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
            </FormControl>
            <FormControl id="time" mb={4}>
              <FormLabel>Time</FormLabel>
              <Input
                name="time"
                value={newBooking.time}
                onChange={handleInputChange}
                placeholder="Time"
              />
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

export default Bookings;


