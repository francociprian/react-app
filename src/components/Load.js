import { Spinner, Flex } from '@chakra-ui/react'

const Load = () => {
  return (
    <Flex w='100vw' h='100vh' justify='center' align='center'>
      <Spinner 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        w='6rem' 
        h='6rem'
      />
    </Flex>
  )
}

export default Load