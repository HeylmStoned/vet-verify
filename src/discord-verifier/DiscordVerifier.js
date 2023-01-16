import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Connex from '@vechain/connex'
import jwtDecode from 'jwt-decode';
import { Box, Button, Center, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { apiUrl } from '../Globals/Globals';
import Header from '../portfolio/Header';
import { Helmet } from 'react-helmet';


function DiscordVerifier() {
  const {search} = useLocation();
  const {token: jwtString} = queryString.parse(search);
  const [signerAddress, setSigner] = useState('');
  const [connectBtnLoading, setConnectBtnLoading] = useState(false)
  const {userID, username, guildID, community, exp} = jwtDecode(jwtString);

  let tokenExp = false;
  if (exp < new Date().getTime()/1000){
    tokenExp = true;
  }
  
  const walletConnect = () => {
    
    if (signerAddress !== '') return;
    let newvendor = new Connex.Vendor("main");
    setConnectBtnLoading(true);
    newvendor
      .sign('cert', {
        purpose: 'identification',
        payload: {
          type: 'text',
          content: `UserID: ${userID}\n Username: ${username}\n ServerID: ${guildID}\n Community: ${community}`,
        },
      })
      .request()
      .then(async (res) => {
        const addr = res.annex.signer;
        if (addr) {
          setSigner(addr);
          setConnectBtnLoading(false);
          console.log(addr);
          const url = `${apiUrl}/verify`;
          const data = {address: addr, token: jwtString}
          axios.post(url, data)
          .then(async (res)=>{
            if (res.status === 200){
              console.log(res.data);
            }
          })
        }
      }).catch(()=> {setConnectBtnLoading(false)});
  }

  return (
    <VStack p={5} >
      <Helmet>
        <title>VeChain Holder Verification</title>
      </Helmet   >
      <Header/>
      {jwtString && !tokenExp && !signerAddress? //Check for token expiration
      <Center py={6} h={'70vh'}>
        <Box maxW={"500px"} bg={'#0D6EFD'} boxShadow={'dark-lg'} rounded={'md'} overflow={'hidden'}>
        
          <Stack spacing={0} align={'center'} mb={5} >
            <Heading fontSize={'18px'} fontWeight={'semibold'} p={4} fontFamily={'body'} >
              Link VeChain Wallet &amp; Discord Account
            </Heading>
            <Text align={'center'} pb={5}>
              Link your VeChain wallet to your Discord account by signing a certificate proving your ownership of that wallet.
            </Text>
            <Button shadow={'base'} onClick={walletConnect} loadingText='Connecting' isLoading={connectBtnLoading}>
              Connect
            </Button>
          </Stack>
        </Box>
      </Center> : jwtString && signerAddress? //Elif Signed
      <Center py={6} h={'70vh'}>
        <Box maxW={"500px"} bg={'#019875'} boxShadow={'dark-lg'} rounded={'md'} overflow={'hidden'}>
          <Stack spacing={0} align={'center'} mb={5} >
            <Heading fontSize={'18px'} fontWeight={'semibold'} p={4} fontFamily={'body'} >
              Success!!!
            </Heading>
            <Text align={'center'} pb={5}>
              Head to discord server to check your roles, it may take a minute to get assigned.
            </Text>
          </Stack>
        </Box>
      </Center>: //Else
      <Stack spacing={0} align={'center'} mb={3} >
      <Heading fontSize={'2xl'} fontWeight={'semibold'} p={4} fontFamily={'body'}>
        Link Expired!!
      </Heading>
      <Text align={'center'} px={4} pb={5}>
        Generate a new link via command in discord 
      </Text>
    </Stack>}
      <Box>
      </Box>
    </VStack>
  )
}

export default DiscordVerifier