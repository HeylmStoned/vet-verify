import React from 'react';
import { VStack } from "@chakra-ui/react";

import Header from '../portfolio/Header';
import Profile from '../portfolio/Profile';


function Home() {

  return (
    <VStack p={5}>
    <Header></Header>
    <Profile></Profile>
  </VStack>
  )
}

export default Home