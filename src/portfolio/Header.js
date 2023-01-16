import {useMediaQuery, Heading, Spacer, Flex } from '@chakra-ui/react';
import React from 'react';



function Header() {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");
  
  return (
    
    <Flex w="100%">
      <Heading 
        ml={isNotSmallerScreen? 8: 4} mr={isNotSmallerScreen? 0: 4} size="md" fontWeight="semibold" color="cyan.400">VeChain/Discord Verification System</Heading>
      <Spacer></Spacer>
    </Flex>
    
  )
}

export default Header
