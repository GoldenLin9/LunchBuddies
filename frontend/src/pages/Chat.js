// src/pages/Chat.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, VStack, Heading, Input, Button, Text, HStack, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import AuthContext from '../context/AuthContext';

const Chat = () => {
  const { id } = useParams();
  // const [messages, setMessages] = useState([
  //   { id: 1, sender: 'System', text: 'Welcome to the chat room!' },
  //   { id: 2, sender: 'John', text: 'Hey everyone, excited for lunch!' },
  //   { id: 3, sender: 'Sarah', text: 'Me too! Where are we meeting?' },
  // ]);
  const [newMessage, setNewMessage] = useState('');

  let {user} = useContext(AuthContext)


  // const toast = useToast();

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     setMessages([...messages, { id: messages.length + 1, sender: 'You', text: newMessage }]);
  //     setNewMessage('');
  //     toast({
  //       title: "Message sent",
  //       status: "success",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const [messages, setMessages] = useState([]);
  const chatSocket = new WebSocket(
    `ws://localhost:8000/ws/chat/${id}/`
  );

  chatSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    console.log("GOT: ", data)

    setMessages([...messages, {content: data.message}]);
  };

  function handleSendMessage() {
    
    chatSocket.send(JSON.stringify({
      'message': newMessage,
      'room_id': id
    }))

    setNewMessage('')

    console.log("messages: ", messages)
  }

  let api = useAxios();

  useEffect(()=> {
    api.get(`chat/messages/${id}`).then((response) => {
      console.log(response.data)
      setMessages(response.data)
    })

  }, []);


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
          {messages? messages.map((message, i) => (
            // <Box key={i} mb={2} p={2} bg={message.sender === 'You' ? "blue.100" : "white"} borderRadius="md">
            //   <Text fontWeight="bold">{message.sender}:</Text>
            //   <Text>{message.text}</Text>
            // </Box>
            <div key = {i}>{message.content}</div>
          )) : <div>LOADING MESSAGES</div>}
        </Box>
        <HStack>
          <Input 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button colorScheme="teal" onClick = {handleSendMessage} >Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;
