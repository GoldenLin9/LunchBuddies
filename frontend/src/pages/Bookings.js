// src/pages/Bookings.js
import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import BookingCard from '../components/BookingCard';

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <Box maxW="container.xl" mx="auto" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Lunch Meetups</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {bookings.map((booking, index) => (
            <BookingCard key={index} title={booking.title} location={booking.location} time={booking.time} />
          ))}
        </SimpleGrid>
      </VStack>
      <Box display="flex" justifyContent="center" mt={6}>
        <Button colorScheme="blue" onClick={onOpen}>
          Create Bookings
        </Button>
      </Box>

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


