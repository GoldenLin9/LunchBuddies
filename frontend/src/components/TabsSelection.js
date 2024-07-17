// src/components/TabsSelection.js
import React from 'react';
import { Box, VStack, Text, Button, Wrap, WrapItem } from '@chakra-ui/react';

const TabsSelection = ({ title, options, selectedOptions, onOptionSelect }) => {
  return (
    <Box w="full">
      <Text fontSize="xl" mb={4}>{title}</Text>
      <Wrap>
        {options.map((option) => (
          <WrapItem key={option}>
            <Button
              onClick={() => onOptionSelect(option)}
              colorScheme={selectedOptions.includes(option) ? 'blue' : 'gray'}
              variant={selectedOptions.includes(option) ? 'solid' : 'outline'}
              m={1}
            >
              {option}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default TabsSelection;
