// src/components/BookingCard.js
import React, { useState } from 'react';
import { Box, Heading, Text, Button, useToast, VStack, HStack, Badge, Avatar, AvatarGroup } from '@chakra-ui/react';

import useAxios from '../hooks/useAxios';

const BookingCard = ({ id, title, location, time, date, participants, description, joined }) => {
  const [isJoined, setIsJoined] = useState(joined);
  const toast = useToast();

  let api = useAxios();

  const handleJoin = () => {
    setIsJoined(true);
    toast({
      title: "Joined group",
      description: `You've successfully joined ${title}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Here you would typically send a request to your backend to join the group

    api.post(`join/`, { book_id: id })
      .then((response) => {
        console.log('API response:', response.data);
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md" bg="white">
      <VStack align="stretch" spacing={3}>
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm" color="gray.600">{description}</Text>
        <HStack spacing={2}>
          <Badge colorScheme="blue">{location}</Badge>
          <Badge colorScheme="green">{date}</Badge>
          <Badge colorScheme="purple">{time}</Badge>
        </HStack>
        <Button 
          colorScheme={isJoined ? "green" : "teal"} 
          onClick={handleJoin} 
          isDisabled={isJoined}
        >
          {isJoined ? "Joined" : "Join"}
        </Button>
      </VStack>
    </Box>
  );
};

// Helper function to format date (assuming date is in ISO format)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to format time (assuming time is in ISO format)
const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default BookingCard;
