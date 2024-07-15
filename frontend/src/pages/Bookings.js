// src/pages/Bookings.js
import React from 'react';
import { Box, VStack, Heading, SimpleGrid } from '@chakra-ui/react';
import BookingCard from '../components/BookingCard';

const Bookings = () => (
  <Box maxW="container.xl" mx="auto" py={10}>
    <VStack spacing={6} align="stretch">
      <Heading>Lunch Meetups</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        <BookingCard title="Tech Lunch" location="Byte Cafe" time="12:30 PM" />
        <BookingCard title="Casual Meetup" location="Park Picnic Area" time="1:00 PM" />
        <BookingCard title="Business Networking" location="Downtown Diner" time="12:00 PM" />
      </SimpleGrid>
    </VStack>
  </Box>
);

export default Bookings;
