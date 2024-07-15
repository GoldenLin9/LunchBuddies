// src/components/BookingCard.js
import React from 'react';
import { Box, Heading, Text, Button, useToast, VStack, HStack, Badge, Avatar, AvatarGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BookingCard = ({ id, title, location, time, date, participants, description }) => {
  const toast = useToast();

  const handleJoin = () => {
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
        <HStack>
          <Button colorScheme="teal" onClick={handleJoin} flex={1}>Join</Button>
          <Button as={Link} to={`/chat/${id}`} colorScheme="blue" flex={1}>Chat Room</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default BookingCard;
