import { Box, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type nft = {
  name?: string
  metadata?: string
}

const NftItem = ({ nft }: { nft: nft }): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Box
      w="100%"
      h="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        objectFit="contain"
        boxSize="250px"
        src={nft.metadata && JSON.parse(nft.metadata).image}
      />
      <Box p="2">
        <Box display="flex" alignItems="baseline">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {nft.name}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NftItem
