// src/components/BookingCard.js
import React, { useState } from 'react';
import { Box, Heading, Text, Button, useToast, VStack, HStack, Badge, Avatar, AvatarGroup } from '@chakra-ui/react';

const BookingCard = ({ id, title, location, time, date, participants, description }) => {
  const [isJoined, setIsJoined] = useState(false);
  const toast = useToast();

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
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md" bg="white">
      <VStack align="stretch" spacing={3}>
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm" color="gray.600">{description}</Text>
        <HStack>
          <Badge colorScheme="blue">{location}</Badge>
          <Badge colorScheme="green">{date}</Badge>
          <Badge colorScheme="purple">{time}</Badge>
        </HStack>
        <Box>
          <Text fontSize="sm" fontWeight="bold" mb={1}>Participants:</Text>
          <AvatarGroup size="sm" max={3}>
            {participants.map((participant, index) => (
              <Avatar key={index} name={participant} />
            ))}
          </AvatarGroup>
        </Box>
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

export default BookingCard;
