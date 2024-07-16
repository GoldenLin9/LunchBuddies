// src/pages/Home.js
import React from 'react';
import { Box, VStack, Heading, SimpleGrid, Text, Button, HStack, Badge, Avatar, AvatarGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const JoinedChatCard = ({ id, title, date, time, location, participants }) => (
  <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md" bg="white">
    <VStack align="stretch" spacing={3}>
      <Heading size="md">{title}</Heading>
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
      <Button as={Link} to={`/chat/${id}`} colorScheme="blue">Enter Chat Room</Button>
    </VStack>
  </Box>
);

const Home = () => {
  // This would typically come from your app's state management (e.g., Redux)
  const joinedGroups = [
    { 
      id: 1, 
      title: "Tech Lunch", 
      date: "2024-07-16", 
      time: "12:30 PM", 
      location: "Byte Cafe",
      participants: ["John", "Alice", "Bob"]
    },
    { 
      id: 2, 
      title: "Casual Meetup", 
      date: "2024-07-17", 
      time: "1:00 PM", 
      location: "Park Picnic Area",
      participants: ["Emma", "Michael"]
    },
  ];

  return (
    <Box maxW="container.xl" mx="auto" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Welcome to Lunch Meetup</Heading>
        <Text fontSize="xl">Connect with others and enjoy lunch together!</Text>
        
        <Box>
          <Heading size="md" mb={4}>Your Joined Groups</Heading>
          {joinedGroups.length > 0 ? (
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              {joinedGroups.map(group => (
                <JoinedChatCard 
                  key={group.id} 
                  id={group.id} 
                  title={group.title}
                  date={group.date}
                  time={group.time}
                  location={group.location}
                  participants={group.participants}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text>You haven't joined any groups yet. Check out available meetups!</Text>
          )}
        </Box>
        
        <Button as={Link} to="/bookings" colorScheme="teal" size="lg">
          Find Lunch Meetups
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;