// src/pages/Chat.js
import React, { useState } from 'react';
import { Box, VStack, Heading, Input, Button, Text, HStack, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the chat room!' },
    { id: 2, sender: 'John', text: 'Hey everyone, excited for lunch!' },
    { id: 3, sender: 'Sarah', text: 'Me too! Where are we meeting?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const toast = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', text: newMessage }]);
      setNewMessage('');
      toast({
        title: "Message sent",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="container.md" mx="auto" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Chat Room: Lunch Group {id}</Heading>
        <Box 
          borderWidth={1} 
          borderRadius="lg" 
          p={4} 
          height="400px" 
          overflowY="auto"
          bg="gray.50"
        >
          {messages.map((message) => (
            <Box key={message.id} mb={2} p={2} bg={message.sender === 'You' ? "blue.100" : "white"} borderRadius="md">
              <Text fontWeight="bold">{message.sender}:</Text>
              <Text>{message.text}</Text>
            </Box>
          ))}
        </Box>
        <HStack>
          <Input 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button colorScheme="teal" onClick={handleSendMessage}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;
