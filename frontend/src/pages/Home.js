import React, { useContext, useState } from 'react';
import {
  Box, VStack, Heading, SimpleGrid, Text, Button, HStack, Badge, Avatar, AvatarGroup, Center, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import AuthContext from '../context/AuthContext';

const JoinedChatCard = ({ id, title, date, time, location, participants, onOpen }) => (
  <Box borderWidth={1} borderRadius="lg" p={3} boxShadow="md" bg="white">
    <VStack align="stretch" spacing={2}>
      <Heading size="sm">{title}</Heading>
      <HStack>
        <Badge colorScheme="blue">{location}</Badge>
        <Badge colorScheme="green">{date}</Badge>
        <Badge colorScheme="purple">{time}</Badge>
      </HStack>
      <HStack justifyContent="space-between">
        <AvatarGroup size="xs" max={3}>
          {participants.map((participant, index) => (
            <Avatar key={index} name={participant} />
          ))}
        </AvatarGroup>
        <Button onClick={() => onOpen(id)} colorScheme="blue" size="sm">Enter</Button>
      </HStack>
    </VStack>
  </Box>
);

const BookingSlider = ({ bookings }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {bookings.map((booking, index) => (
        <Box key={index} p={3} borderWidth="1px" borderRadius="lg" boxShadow="md" textAlign="center">
          <Heading size="sm">{booking.title}</Heading>
          <Text fontSize="sm">Location: {booking.location}</Text>
          <Text fontSize="sm">Time: {booking.time}</Text>
        </Box>
      ))}
    </Slider>
  );
};

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = useContext(AuthContext);

  const joinedGroups = [
    { 
      id: 1, 
      title: "Tech Lunch", 
      date: "2024-07-16", 
      time: "12:30 PM", 
      location: "Byte Cafe",
      participants: ["John", "Alice", "Bob"],
      description: "Join us for a casual lunch discussion about the latest tech trends and innovations."
    },
    { 
      id: 2, 
      title: "Casual Meetup", 
      date: "2024-07-17", 
      time: "1:00 PM", 
      location: "Park Picnic Area",
      participants: ["Emma", "Michael"],
      description: "Enjoy a relaxed outdoor lunch with fellow professionals in a beautiful park setting."
    },
  ];

  const bookings = [
    { title: "Tech Lunch", location: "Byte Cafe", time: "12:30 PM" },
    { title: "Casual Meetup", location: "Park Picnic Area", time: "1:00 PM" },
    { title: "Business Networking", location: "Downtown Diner", time: "12:00 PM" },
    { title: "Team Lunch", location: "Byte Cafe", time: "2:00 PM" },
    { title: "Code Review Session", location: "Downtown Diner", time: "3:00 PM" },
  ];

  const handleOpenModal = (id) => {
    setSelectedChat(joinedGroups.find(group => group.id === id));
    onOpen();
  };

  return (
    <Flex direction="column" minHeight="100vh" maxW="container.xl" mx="auto" py={5}>
      <VStack spacing={5} align="stretch" flex="1">
        <Heading size="lg" textAlign="center">Hello {user.username}! Welcome to Lunch Meetup</Heading>
        <Text textAlign="center">Connect with others and enjoy lunch together!</Text>
        
        <Box>
          <Heading size="md" mb={3}>Your Joined Groups</Heading>
          {joinedGroups.length > 0 ? (
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {joinedGroups.map(group => (
                <JoinedChatCard key={group.id} {...group} onOpen={handleOpenModal} />
              ))}
            </SimpleGrid>
          ) : (
            <Text>You haven't joined any groups yet. Check out available meetups!</Text>
          )}
        </Box>
        
        <Center>
          <Button as={Link} to="/bookings" colorScheme="teal" size="lg" width="auto" px={8} margin="">
            <Text fontSize="">Find Lunch Meetups</Text>
          </Button>
        </Center>
        
        <Box flex="1" display="flex" flexDirection="column" justifyContent="flex-end">
          <Heading size="md" mb={3} textAlign="center">Current and Upcoming Bookings</Heading>
          <Box height="35vh">
            <BookingSlider bookings={bookings} />
          </Box>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={3}>
              <Text><strong>Date:</strong> {selectedChat?.date}</Text>
              <Text><strong>Time:</strong> {selectedChat?.time}</Text>
              <Text><strong>Location:</strong> {selectedChat?.location}</Text>
              <Text><strong>Description:</strong> {selectedChat?.description}</Text>
              <Text><strong>Participants:</strong> {selectedChat?.participants.join(', ')}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} as={Link} to={`/chat/${selectedChat?.id}`}>
              Leave Chat
            </Button>
            <Button colorScheme="blue" mr={3} as={Link} to={`/chat/${selectedChat?.id}`}>
              Enter Chat
            </Button> 
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Home;
