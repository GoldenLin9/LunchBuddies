// src/pages/Home.js
// import React from 'react';
// import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';

// const Home = () => (
//   <Box maxW="container.md" mx="auto" py={10}>
//     <VStack spacing={6}>
//       <Heading>Welcome to Lunch Meetup</Heading>
//       <Text fontSize="xl">Connect with others and enjoy lunch together!</Text>
//       <Button as={Link} to="/bookings" colorScheme="teal" size="lg">
//         Find a Lunch Group
//       </Button>
//     </VStack>
//   </Box>
// );

// export default Home;


// src/pages/Home.js
import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const Home = () => {
  const bookings = [
    { title: "Tech Lunch", location: "Byte Cafe", time: "12:30 PM" },
    { title: "Casual Meetup", location: "Park Picnic Area", time: "1:00 PM" },
    { title: "Business Networking", location: "Downtown Diner", time: "12:00 PM" },
    { title: "Team Lunch", location: "Byte Cafe", time: "2:00 PM" },
    { title: "Code Review Session", location: "Downtown Diner", time: "3:00 PM" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6}>
        <Heading>Welcome to Lunch Meetup</Heading>
        <Text fontSize="xl">Connect with others and enjoy lunch together!</Text>
        <Button as={Link} to="/bookings" colorScheme="teal" size="lg">
          Find a Lunch Group
        </Button>

        <Box width="100%" mt={10}>
          <Heading size="lg" mb={4}>Current and Upcoming Bookings</Heading>
          <Slider {...settings}>
            {bookings.map((booking, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Heading size="md">{booking.title}</Heading>
                <Text>Location: {booking.location}</Text>
                <Text>Time: {booking.time}</Text>
              </Box>
            ))}
          </Slider>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
