// src/pages/Home.js
import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => (
  <Box maxW="container.md" mx="auto" py={10}>
    <VStack spacing={6}>
      <Heading>Welcome to Lunch Meetup</Heading>
      <Text fontSize="xl">Connect with others and enjoy lunch together!</Text>
      <Button as={Link} to="/bookings" colorScheme="teal" size="lg">
        Find a Lunch Group
      </Button>
    </VStack>
  </Box>
);

export default Home;
