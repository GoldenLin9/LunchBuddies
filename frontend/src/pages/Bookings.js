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

import useAxios from '../hooks/useAxios';

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [newBooking, setNewBooking] = useState({
    description: '',
    location: '',
    meeting_time: '',
    members: []
  });

  let api = useAxios();

  const fetchBookings = async () => {
    // try {
    //   const response = await axios.get('http://localhost:8000/api/allBooks/', {
    //     headers: {
    //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMzUyMTYxLCJpYXQiOjE3MjEyNjU3NjEsImp0aSI6IjJhODczNDZlZDVmYjQ1OTg4ZDk2Y2ZhZDE1YTRhY2EzIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJHb2xkZW4iLCJhZ2UiOm51bGwsIm1ham9yIjpudWxsLCJiaW8iOm51bGx9.dVRHHJDUH5Hb2Oo4cdU-GetUzeNHwaaas25TUQJj9OU'
    //     }
    //   });
  
    //   console.log('API response:', response.data);
    //   console.log('Type of response.data:', typeof response.data);
  
    //   const objStrings = response.data.match(/\{[^}]+\}/g);
    //   const bookingsArray = objStrings.map(str => {
    //     const jsonStr = str.replace(/'/g, '"');
    //     return JSON.parse(jsonStr);
    //   });
  
    //   console.log('Parsed bookings:', bookingsArray);
  
    //   setBookings(bookingsArray);
    //   setLoading(false);
    // } catch (error) {
    //   console.error("There was an error fetching the bookings!", error);
    //   toast({
    //     title: "Error fetching bookings",
    //     description: "Please try again later.",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   setBookings([]);
    //   setLoading(false);
    // }

    api.get('allBooks/').then((response) => {
      console.log("response.data: ", response.data)
      setBookings(response.data)
      setLoading(false)
    })

  };
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSave = async () => {
    try {
      const formattedTime = new Date(newBooking.meeting_time).toISOString();
      const dataToSend = {
        ...newBooking,
        meeting_time: formattedTime,
        members: [2, 3, 4] // You might want to make this dynamic in the future
      };
  
      const response = await axios.post('http://localhost:8000/api/create/', dataToSend, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMzUyMTYxLCJpYXQiOjE3MjEyNjU3NjEsImp0aSI6IjJhODczNDZlZDVmYjQ1OTg4ZDk2Y2ZhZDE1YTRhY2EzIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJHb2xkZW4iLCJhZ2UiOm51bGwsIm1ham9yIjpudWxsLCJiaW8iOm51bGx9.dVRHHJDUH5Hb2Oo4cdU-GetUzeNHwaaas25TUQJj9OU'
        }
      });
  
      console.log('Booking created:', response.data);
      toast({
        title: "Booking created",
        description: "Your booking has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      // Refresh the bookings list
      fetchBookings();
  
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error creating booking",
        description: "There was an error creating your booking. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeLocation = (e) => {
    console.log(e.target.value)
    console.log(bookings[0])
    console.log(bookings[0].location)
    setBookings(bookings.map(booking => booking.location === e.target.value));
    setLocation(e.target.value);
  }

  return (
    <Box maxW="container.xl" mx="auto" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Lunch Meetups</Heading>

        <Stack direction={["column", "column", "row"]} spacing={4}>
          <Select 
            placeholder="Filter by location" 
            value={location} 
            onChange={handleChangeLocation}
          >
            <option value="63 South">63 South</option>
            <option value="Knightros">Knightros</option>
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
      value={newBooking.description}
      onChange={handleInputChange}
    />
  </FormControl>
  <FormControl id="location" mb={4}>
    <FormLabel>Location</FormLabel>
    <Input
      name="location"
      placeholder="Location"
      value={newBooking.location}
      onChange={handleInputChange}
    />
  </FormControl>
  <FormControl id="meeting_time" mb={4}>
    <FormLabel>Date and Time</FormLabel>
    <Input
      name="meeting_time"
      type="datetime-local"
      placeholder="Date and Time"
      value={newBooking.meeting_time}
      onChange={handleInputChange}
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
