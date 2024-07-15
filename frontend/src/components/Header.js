// src/components/Header.js
import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => (
  <Box bg="teal.500" py={4}>
    <Flex maxW="container.xl" mx="auto" align="center" color="white">
      <Heading size="lg">Lunch Meetup</Heading>
      <Spacer />
      <Button as={Link} to="/" variant="ghost" mr={2}>Home</Button>
      <Button as={Link} to="/bookings" variant="ghost" mr={2}>Bookings</Button>
      <Button as={Link} to="/profile" variant="ghost">Profile</Button>
    </Flex>
  </Box>
);

export default Header;

