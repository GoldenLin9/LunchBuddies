// src/pages/Chat.js
import React from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import ChatWindow from '../components/ChatWindow';

const Chat = () => (
  <Box maxW="container.xl" mx="auto" py={10}>
    <VStack spacing={6} align="stretch">
      <Heading>Chat Room</Heading>
      <ChatWindow />
    </VStack>
  </Box>
);

export default Chat;
