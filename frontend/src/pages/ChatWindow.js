// src/components/ChatWindow.js
import React from 'react';
import { Box, VStack, Input, Button, Text } from '@chakra-ui/react';

const ChatWindow = () => (
  <Box borderWidth={1} borderRadius="lg" p={4}>
    <VStack spacing={4} align="stretch" height="400px">
      <Box flex={1} overflowY="auto">
        <Text>Welcome to the chat!</Text>
        {/* Chat messages would be rendered here */}
      </Box>
      <Box>
        <Input placeholder="Type your message..." mr={2} />
        <Button colorScheme="teal">Send</Button>
      </Box>
    </VStack>
  </Box>
);

export default ChatWindow;
