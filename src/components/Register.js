import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate }  from "react-router-dom";
import { Input, FormLabel, FormControl, Box, Button, Flex, Text } from '@chakra-ui/react'
import SwiperSlider from "./swiperSlider/SwiperSlider";
import ToogleDarkMode from './toogleDarkMode/ToogleDarkMode';
import Alert from "./Alert";


export default function Register() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = ({target: {id, value}}) => {
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

  return (
    <Flex h='100vh' w='100vw' align='center' justify='center' gap='5'>
      <SwiperSlider/> 
      <Box 
        w='50vw' 
        sx={{
            '@media (max-width: 768px)': {
              width: '80vw',
              px: '0'
            }}} 
        px='10'
      >
      {error && <Alert message={error}/>}
        <ToogleDarkMode />
        <Text fontSize='6xl'>Register</Text>
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
            <Input 
              variant='flushed'
              type="password" 
              id="password" 
              placeholder="********"
              onChange={handleChange} 
            />
            <Button type='submit' colorScheme='teal' my='15px'>Register</Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  )
}
