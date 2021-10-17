import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react'

const Nav = (): JSX.Element => {
  return (
    <Flex>
      <Box p="2">
        <Heading size="md">Chakra App</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="teal" mr="4">
          Sign Up
        </Button>
        <Button colorScheme="teal">Log in</Button>
      </Box>
    </Flex>
  )
}

export default Nav
