// src/pages/Bookings.js
import React, { useState } from 'react';
import { Box, VStack, Heading, SimpleGrid, Select, Input, HStack, Button, useToast } from '@chakra-ui/react';
import BookingCard from '../components/BookingCard';

const Bookings = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const toast = useToast();

  const handleCreateBooking = () => {
    toast({
      title: "Create New Booking",
      description: "This feature is not implemented yet.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="container.xl" mx="auto" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Lunch Meetups</Heading>
        
        <HStack>
          <Select placeholder="Filter by location" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="Byte Cafe">Byte Cafe</option>
            <option value="Park Picnic Area">Park Picnic Area</option>
            <option value="Downtown Diner">Downtown Diner</option>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button colorScheme="teal" onClick={handleCreateBooking}>Create New Booking</Button>
        </HStack>

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
    </Box>
  );
};

export default Bookings;
