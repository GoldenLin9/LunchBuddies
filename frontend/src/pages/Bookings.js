import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/allBooks/', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMzUyMTYxLCJpYXQiOjE3MjEyNjU3NjEsImp0aSI6IjJhODczNDZlZDVmYjQ1OTg4ZDk2Y2ZhZDE1YTRhY2EzIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJHb2xkZW4iLCJhZ2UiOm51bGwsIm1ham9yIjpudWxsLCJiaW8iOm51bGx9.dVRHHJDUH5Hb2Oo4cdU-GetUzeNHwaaas25TUQJj9OU'
          }
        });
  
        console.log('API response:', response.data);
        console.log('Type of response.data:', typeof response.data);
  
        // Split the string into individual object strings
        const objStrings = response.data.match(/\{[^}]+\}/g);
  
        // Parse each object string individually
        const bookingsArray = objStrings.map(str => {
          // Replace single quotes with double quotes
          const jsonStr = str.replace(/'/g, '"');
          return JSON.parse(jsonStr);
        });
  
        console.log('Parsed bookings:', bookingsArray);
  
        setBookings(bookingsArray);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the bookings!", error);
        toast({
          title: "Error fetching bookings",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setBookings([]);
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, [toast]);

  const handleSave = () => {
    // Implement save logic here, e.g., sending a POST request to save the booking
    console.log("Save button clicked");
    onClose(); // Close the modal after saving
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
  {loading ? (
    <Box>Loading...</Box>
  ) : bookings.length > 0 ? (
    bookings.map((booking) => (
      <BookingCard 
        key={booking.id}
        id={booking.id}
        title={`Booking ${booking.id}`}
        location={booking.location}
        time={new Date(booking.meeting_time).toLocaleTimeString()}
        date={new Date(booking.meeting_time).toLocaleDateString()}
        description={booking.description}
        participants={booking.members}
      />
    ))
  ) : (
    <Box>No bookings found.</Box>
  )}
</SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a New Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="description" mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                placeholder="Description"
              />
            </FormControl>
            <FormControl id="location" mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                placeholder="Location"
              />
            </FormControl>
            <FormControl id="date" mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                name="date"
                type="date"
                placeholder="Date"
              />
            </FormControl>
            <FormControl id="time" mb={4}>
              <FormLabel>Time</FormLabel>
              <Input
                name="time"
                type="time"
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
