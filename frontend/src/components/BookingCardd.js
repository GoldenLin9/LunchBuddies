import React from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

const BookingCardd = ({ key, location, time, date, description }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      {/* <Heading fontSize="xl">{title}</Heading> */}
      <Text mt={2} fontSize="md">Location: {location}</Text>
      <Text mt={2} fontSize="md">Time: {time}</Text>
      <Text mt={2} fontSize="md">Date: {date}</Text>
     
      <Text mt={2} fontSize="md">Description: {description}</Text>
    </Box>
  );
};

export default BookingCardd;
