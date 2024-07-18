import React, { useState } from 'react';
import { Button, Box, Heading, VStack, Text } from '@chakra-ui/react'; // Example import for Chakra UI

const Testing = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    console.log('Fetching bookings...');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/book/');
      const data = await response.json();
      setBookings(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading>Testing Fetching API Data</Heading>

      <Button onClick={fetchBookings}>Fetch Bookings</Button>

      {bookings.length > 0 && (
        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Heading size="md">Fetched Bookings:</Heading>
          <VStack align="stretch" mt={2} spacing={2}>
            {bookings.map((booking) => (
              <Box key={booking.id} borderWidth="1px" borderRadius="md" p={2}>
                <Text>Owner: {booking.owner}</Text>
                <Text>Members: {booking.members}</Text>
                <Text>Location: {booking.location}</Text>
                <Text>Date: {new Date(booking.meeting_time).toLocaleDateString()}</Text>
                <Text>Time: {new Date(booking.meeting_time).toLocaleTimeString()}</Text>
                <Text>Description: {booking.description}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default Testing;
