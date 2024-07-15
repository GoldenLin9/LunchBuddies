// src/components/BookingCard.js
import React from 'react';
import { Box, Heading, Text, Button, useToast } from '@chakra-ui/react';

const BookingCard = ({ title, location, time }) => {
  const toast = useToast();

  const handleJoin = () => {
    // Here you would typically send a request to your backend to join the group
    console.log('Joining group:', title);
    toast({
      title: "Joined group",
      description: `You've successfully joined ${title}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Heading size="md" mb={2}>{title}</Heading>
      <Text>Location: {location}</Text>
      <Text>Time: {time}</Text>
      <Button mt={4} colorScheme="teal" onClick={handleJoin}>Join</Button>
    </Box>
  );
};

export default BookingCard;
