import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate }  from "react-router-dom";
import { Input, FormLabel, FormControl, Box, Button, Flex, Text } from '@chakra-ui/react'
import Alert from "./Alert";
import SwiperSlider from "./swiperSlider/SwiperSlider";
import ToogleDarkMode from './toogleDarkMode/ToogleDarkMode';

import { InputGroup, InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Register() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = ({target: {id, value}}) => {
    console.log(id)
    setUser({...user, [id]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  // PASSWORD
  const [show, setShow] = useState(false)
  const handleClickShowPassword = () => setShow(!show)

  return (
    <Flex h='100vh' w='100vw' align='center' justify='center' gap='5'>
      <SwiperSlider/> 
      <Flex direction='column' h='100%'>
        <Flex h='30%' justify='flex-end' p='3' ><ToogleDarkMode /></Flex>
        <Box 
          w='50vw' 
          sx={{
              '@media (max-width: 768px)': {
                width: '80vw',
                px: '0'
              }}} 
          px='10'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          {error && <Alert message={error}/>}
          <Text fontSize='6xl'>Register</Text>
          <Flex direction='column' w='70%'>
            <form onSubmit={handleSubmit}>
              <FormControl display='flex' flexDirection='column'>
                <FormLabel htmlFor="email" pt='2'>Email</FormLabel>
                <Input 
                  variant='flushed'
                  type="email" 
                  id="email"
                  placeholder="youremail@hotmail.com" 
                  onChange={handleChange} 
                />
                <FormLabel htmlFor="password" pt='2'>Password</FormLabel>
                <InputGroup id="password" size='lg' variant='flushed' onChange={handleChange}>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    id="password"
                    placeholder='********'
                  />
                  <InputRightElement 
                    // width='4.5rem' 
                    >
                    <Button
                      // h='1.75rem'  
                      size='sm'
                      onClick={handleClickShowPassword}
                    >
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button type='submit' colorScheme='teal' my='15px'>Register</Button>
              </FormControl>
            </form>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}
