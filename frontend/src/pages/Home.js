import React, { useContext, useEffect, useState } from 'react';
import {
  Box, VStack, Heading, SimpleGrid, Text, Button, HStack, Badge, Avatar, AvatarGroup, Center, Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import AuthContext from '../context/AuthContext';
import axios from 'axios'
import useAxios from '../hooks/useAxios';

function convertMeetingTime(meetingTime) {
  // Parse the ISO 8601 date string
  const date = new Date(meetingTime);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    date: formattedDate,
    time: formattedTime
  };
}

const JoinedChatCard = ({ id, title, meeting_time, location, members, onOpen, currentNames, setCurrentNames }) => {
  let api = useAxios();
  const { date, time } = convertMeetingTime(meeting_time);
  const [names, setNames] = useState([]);
  console.log(`In joined chat card: ${members}`);
  console.log(`date and time: ${date} ${time}`);

  useEffect(() => {
    const fetchMembers = async () => {
      console.log(`In fetchMembers: ${members}`);
      let names = [];
      for (let i = 0; i < members.length; i++) {
        let response = await api.get(`get-user/${members[i]}`);
        console.log(`response from getname ${members[i]}: ${response.data.first_name}`);
        let fullName = response.data.first_name + " " + response.data.last_name;
        names.push(response.data.username);
      }
      setNames(names);
      setCurrentNames({...currentNames, id: names});
    };
    fetchMembers();
  }, []);

  useEffect(() => {console.log(`names changed: ${names}`)}, [names]);

  return (
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
            {names.map((participant, index) => (
              <Avatar key={index} name={participant} />
            ))}
          </AvatarGroup>
          <Button onClick={() => onOpen(id)} colorScheme="blue" size="sm">Enter</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

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
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [currentNames, setCurrentNames] = useState({});
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  let api = useAxios();

  useEffect(() => {
    fetchJoinedGroups().then((response) => {
      console.log("Joined groups fetched successfully");
      console.log(`fetched joined groups: ${joinedGroups}`);
      console.log(`this is reponse: ${response}`);
      console.log(`type of joinedGroups: ${typeof(joinedGroups)}`);
      console.log(`length of joinedGroups: ${joinedGroups.length}`);
    });

    console.log(`About to get user 12 from the backend`);
    api.get(`get-user/12`).then((response) => {
      console.log(`Just got user 2 from the backend: ${response.data}`);
    }).catch((error) => {
      console.error(`Error fetching user 2: ${error}`);
    });
  }, []);

  useEffect(() => {
    console.log("Joined groups updated:", joinedGroups);
    console.log("Now type of joinedGroups: ", typeof(joinedGroups));
    console.log(`length of joinedGroups: ${joinedGroups.length}`);
  }, [joinedGroups]);

  const fetchJoinedGroups = async () => {
    try {
      const response = await api.get('myBooks');
      setJoinedGroups(response.data);
    } catch (error) {
      console.error("Error fetching joined groups:", error);
    }
  };

  
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

  const handleLeaveChat = async () => {
    if (!selectedChat || !user) return;

    try {

      const getResponse = await api.get(`book/${selectedChat.id}`);
      const currentBooking = getResponse.data;

      const updatedMembers = currentBooking.members.filter(memberId => memberId !== 3);

      const updatedBooking = {
        ...currentBooking,
        members: updatedMembers
      };

      const putResponse = await api.put(`book/${selectedChat.id}`, updatedBooking);

      if (putResponse.status === 200) {
        toast({
          title: "Left chat successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error leaving chat:", error);
      toast({
        title: "Error leaving chat",
        description: error.response?.data?.message || "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" minHeight="100vh" maxW="container.xl" mx="auto" py={5}>
      <VStack spacing={5} align="stretch" flex="1">
        <Heading size="lg" textAlign="center">Hello {user.username}! Welcome to Lunch Meetup</Heading>
        <Text textAlign="center">Connect with others and enjoy lunch together!</Text>
        
        <Box>
          <Heading size="md" mb={3}>Your Joined Groups</Heading>
          {joinedGroups.length > 0 ? (
            console.log(`In joined: ${joinedGroups} somehow joined groups has a length of ${joinedGroups.length} and is of type ${typeof(joinedGroups)}`),
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
              {joinedGroups.map(group => (
                <JoinedChatCard key={group.id} {...group} onOpen={handleOpenModal} setCurrentNames={setCurrentNames} />
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
              <Text><strong>Participants:</strong> {Object.values(currentNames).join(', ')}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleLeaveChat}>
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