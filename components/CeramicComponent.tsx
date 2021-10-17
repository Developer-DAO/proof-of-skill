import { Box, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { TileDocument } from '@ceramicnetwork/stream-tile'
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import { ethers } from 'ethers';

// hacky but going for function first
import Ceramic, { CeramicClient } from '@ceramicnetwork/http-client';
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids';
// public testnet URL (read/write, randomly purges)
const API_URL = 'https://ceramic-clay.3boxlabs.com';

const CeramicComponent = () => {
  const [ceramic, setCeramic] = useState<CeramicClient>();
  const [streamId, setStreamId] = useState<string>();
  const [address, setAddress] = useState<string>();

  const buildCeramic = async () => {
    const newCeramic = new CeramicClient(API_URL);
    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(newCeramic),
    }
    newCeramic.did = new DID({ resolver });
    
    const addresses = await window.ethereum.enable();
    if(addresses && addresses[0]){
      setAddress(addresses[0]);
    }
    console.log('addresses',addresses);
    // build teh ceramic instance
    const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
    const threeIdConnect = new ThreeIdConnect();
    await threeIdConnect.connect(authProvider);
    const provider = await threeIdConnect.getDidProvider();
    newCeramic.did.setProvider(provider);
    await newCeramic.did.authenticate();
    setCeramic(newCeramic);
  }

  const createTile = async () => {
    if(!ceramic){
      console.error("no ceramic");
      return;
    }
    const doc = await TileDocument.create(ceramic, {hello: 'world'})
    console.log(doc.content);
    setStreamId(doc.id.toString());
  }

  const queryTile = async () => {
    if(!ceramic){
      console.error("no ceramic to query");
      return;
    }
    if(!streamId){
      console.error("no stream id");
      return;
    }
    const doc = await TileDocument.load(ceramic,streamId);
    console.log('doc content',doc.content);
  }

  const modifyTile = async () => {
    if(!ceramic){
      console.error("no ceramic to modify");
      return;
    }
    if(!streamId){
      console.error("no stream id");
      return;
    }
    const doc = await TileDocument.load(ceramic, streamId);

    await doc.update({
      education: [
        {
          name: 'Young Institute',
          title: 'MBA',
          startDate: '2008-01-01',
          endDate: '2009-12-31'
        },
        {
          name: 'Carnegie Mellon',
          title: 'BS Computer Science',
          startDate: '2004-01-01',
          endDate: '2005-12-31'
        },
        {
          name: 'Generic Highschool',
          title: 'Highschool education',
          startDate: '1998-06-28',
          endDate: '2002-05-15'
        }
      ]
    });

    console.log('updated doc',doc.content);
  }
  // page load
  useEffect(() => {
    buildCeramic();
  }, []);

  return (
    <Box>
      <Text>this is ceramic</Text>
      { address ? <Text>Connected as {address}</Text> : null }
      <Button onClick={createTile}>Create Tile</Button>
      <Button onClick={queryTile}>Query Tile</Button>
      <Text>Stream ID: {streamId}</Text>
      <Button onClick={modifyTile}>Update Tile</Button>
    </Box>
  )
}


export default CeramicComponent;