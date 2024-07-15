// src/components/Header.js
import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const NavButton = ({ to, children }) => (
    <Button
      as={Link}
      to={to}
      variant={location.pathname === to ? "solid" : "ghost"}
      bg={location.pathname === to ? "teal.600" : "transparent"}
      _hover={{ bg: "teal.600" }}
      mr={2}
    >
      {children}
    </Button>
  );

  return (
    <Box bg="teal.500" py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" color="white">
        <Heading size="lg">Lunch Meetup</Heading>
        <Spacer />
        <NavButton to="/">Home</NavButton>
        <NavButton to="/bookings">Bookings</NavButton>
        <NavButton to="/profile">Profile</NavButton>
      </Flex>
    </Box>
  );
};

export default Header;