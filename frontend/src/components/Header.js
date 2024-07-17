// // src/components/Header.js
// import React from 'react';
// import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
// import { Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const location = useLocation();

//   const NavButton = ({ to, children }) => (
//     <Button
//       as={Link}
//       to={to}
//       variant={location.pathname === to ? "solid" : "ghost"}
//       bg={location.pathname === to ? "teal.600" : "transparent"}
//       _hover={{ bg: "teal.600" }}
//       mr={2}
//     >
//       {children}
//     </Button>
//   );

//   return (
//     <Box bg="teal.500" py={4}>
//       <Flex maxW="container.xl" mx="auto" align="center" color="white">
//         <Heading size="lg">Lunch Meetup</Heading>
//         <Spacer />
//         <NavButton to="/">Home</NavButton>
//         <NavButton to="/bookings">Bookings</NavButton>
//         <NavButton to="/profile">Profile</NavButton>
//       </Flex>
//     </Box>
//   );
// };

// export default Header;

// import React from 'react';
// import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
// import { Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const location = useLocation();

//   const NavButton = ({ to, children }) => (
//     <Button
//       as={Link}
//       to={to}
//       variant={location.pathname === to ? "solid" : "ghost"}
//       bg={location.pathname === to ? "teal.600" : "transparent"}
//       _hover={{ bg: "teal.600" }}
//       mr={2}
//     >
//       {children}
//     </Button>
//   );

//   return (
//     <Box bg="teal.500" py={4}>
//       <Flex maxW="container.xl" mx="auto" align="center" color="white">
//         <Heading
//           size="lg"
//           as={Link}
//           to="/"
//           _hover={{ cursor: "pointer" }}
//         >
//           Lunch Meetup
//         </Heading>
//         <Spacer />
//         <NavButton to="/">Home</NavButton>
//         <NavButton to="/bookings">Bookings</NavButton>
//         <NavButton to="/profile">Profile</NavButton>
//       </Flex>
//     </Box>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import { Box, Flex, Heading, Spacer, Button, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    // Your logout logic here (e.g., removing auth tokens, etc.)
    console.log('Logging out');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box bg="teal.500" py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" color="white">
        <Heading
          size="lg"
          as={Link}
          to="/"
          _hover={{ cursor: "pointer" }}
        >
          Lunch Meetup
        </Heading>
        <Spacer />
        <NavButton to="/">Home</NavButton>
        <NavButton to="/bookings">Bookings</NavButton>
        <NavButton to="/profile">Profile</NavButton>
        <Menu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
          <MenuButton
            as={IconButton}
            icon={<FaPowerOff />}
            colorScheme="black"
            variant="ghost"
            _hover={{ bg: "teal.600" }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Logout"
          />
          <MenuList>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;

