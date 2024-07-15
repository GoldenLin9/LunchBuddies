// src/components/BookingCard.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const BookingCard = ({ title, location, time }) => (
  <Box borderWidth={1} borderRadius="lg" p={4}>
    <Heading size="md" mb={2}>{title}</Heading>
    <Text>Location: {location}</Text>
    <Text>Time: {time}</Text>
    <Button mt={4} colorScheme="teal">Join</Button>
  </Box>
);

export default BookingCard;
