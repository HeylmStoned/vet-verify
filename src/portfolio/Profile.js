import { Stack, Flex, Image, Box, Text, Button, Circle, useMediaQuery } from '@chakra-ui/react';

import React from 'react';

export default function Profile() {
  
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  return (
    <Stack>
      <Flex direction={isNotSmallerScreen? "row": "column"} spacing="200px" 
      p={isNotSmallerScreen? "24": "0"} alignSelf="flex-start" mt={isNotSmallerScreen? 0: 8}>
        
        <Circle position={"fixed"} bg="blue.400" opacity={0.1} 
        w={isNotSmallerScreen? "300px": "150px"} h={isNotSmallerScreen? "300px": "150px"} alignSelf="flex-start" />
        <Image ml={isNotSmallerScreen? 12: 6} mt={isNotSmallerScreen? "12": "6"} 
        borderRadius="full" backgroundColor={"transparent"} zIndex="1"
        boxShadow="lg" boxSize={isNotSmallerScreen? "205px": "150px"} src="https://s20.directupload.net/images/221206/q2eq5osv.jpg" />
        
        <Box mt={isNotSmallerScreen? "0": 12} ml={isNotSmallerScreen? 16: 0}>
          <Text fontSize={isNotSmallerScreen? "4xl": "2xl"} fontWeight="semibold">
            Hi, I'm
          </Text>
          <Text fontSize={isNotSmallerScreen? "6xl": "3xl"} fontWeight="bold" 
          bgGradient={"linear(to-r, cyan.400, blue.500, purple.600)"} bgClip="text">
            @heyimstoned_v
          </Text>
          <Text color={"gray.200"}>
            Python Programmer, Discord Wizard
          </Text>

          <Button mt={8} colorScheme="blue" onClick={()=>{window.open("https://www.twitter.com/heyimstoned_v")}}>Contact me</Button>
        </Box>
      </Flex>
    </Stack>
  )
}
