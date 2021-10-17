import React from 'react'
import { Container, SimpleGrid } from '@chakra-ui/react'

import NftItem from './NftItem'

const NftList = ({
  nfts,
}: {
  nfts: {
    ethNFTs: object[]
    maticNFTs: object[]
  }
}) => {
  return (
    <Container maxW="container.xl" mt={5}>
      <SimpleGrid templateColumns="repeat(5, 1fr)" gap={6}>
        {nfts.ethNFTs.map((nft: object) => (
          <NftItem nft={nft} />
        ))}
        {nfts.maticNFTs.map((nft: object) => (
          <NftItem nft={nft} />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default NftList
