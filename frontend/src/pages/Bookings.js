import React, { useState, useEffect } from 'react';
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
  Stack,
  Select,
  useToast,
} from '@chakra-ui/react';
import BookingCardd from '../components/BookingCardd';

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ title: "", location: "", time: "", date: "", description: "" });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/book/');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({ title: 'Error Fetching Bookings', status: 'error' });
      }
    };

    fetchBookings();
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const bookingData = {
      title: newBooking.title,
      location: newBooking.location,
      time: newBooking.time,
      date: newBooking.date,
      description: newBooking.description,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const createdBooking = await response.json();
      setBookings((prev) => [...prev, createdBooking]);
      toast({ title: 'Booking created!', status: 'success' });
      setNewBooking({ title: "", location: "", time: "", date: "", description: "" });
      onClose();
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({ title: 'Failed to create booking', status: 'error' });
    }
  };

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
          {bookings.map((booking) => (
            <BookingCardd 
              key={booking.id} 
              location={booking.location} 
              time={booking.time} 
              date={booking.date}
              description={booking.description}
            />
          ))}
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
                type="time"
                placeholder="Time"
              />
            </FormControl>
            <FormControl id="date" mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                name="date"
                type="date"
                value={newBooking.date}
                onChange={handleInputChange}
                placeholder="Date"
              />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={newBooking.description}
                onChange={handleInputChange}
                placeholder="Description"
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
