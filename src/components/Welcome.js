import Flag from '../assets/images/flag.svg'
import { Box, Image  } from '@chakra-ui/react'

const Welcome = () => {
  return (
    <Box h='100vh' display='flex' justifyContent='center'>
        <Image  width='40%' src={Flag} alt="flag" />
    </Box>
  )
}

export default Welcome