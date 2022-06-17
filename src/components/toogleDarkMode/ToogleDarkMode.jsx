import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { FiSun, FiMoon } from "react-icons/fi";

export default function ToogleDarkMode() {
  const {colorMode, toggleColorMode} = useColorMode()

  return (
    <Flex justify='flex-end'>
      <IconButton 
          size='md' 
          icon={colorMode === 'light' ? <FiMoon color='#2C5282'/> : <FiSun color='#F6AD55' />  }
          isRound='true'
          onClick={toggleColorMode}
      ></IconButton>
    </Flex>
  )
}