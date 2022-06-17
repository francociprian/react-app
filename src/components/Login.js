import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link }  from "react-router-dom";
import { Input, FormLabel, FormControl, Box, Button, Text, Flex, Stack} from '@chakra-ui/react'
import Alert from "./Alert";
import ToogleDarkMode from './toogleDarkMode/ToogleDarkMode';
import SwiperSlider from "./swiperSlider/SwiperSlider";

function Login() {
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  
  const { login, loginWhitGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]:value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }
  
  const handleGoogleSignin = async () => {
    try {
      await loginWhitGoogle();
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  }

  const handleResetPassword = async () => {
    if(!user.email) return setError('Please enter your email');
    try {
      await resetPassword(user.email);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Flex h='100vh' w='100vw' align='center' justify='space-between' paddingRight='100px'>
      <SwiperSlider /> 
      <Box >
        {error && <Alert message={error}/>}
        <ToogleDarkMode />
        <Text fontSize='6xl' fontWeight='bold'>Login</Text>
        <form onSubmit={handleSubmit}>
          <FormControl w='2xl' display='flex' flexDirection='column'>
            <FormLabel htmlFor="email" pt='2'>Email</FormLabel>
            <Input 
              variant='flushed'
              type="email" 
              name="email"
              placeholder="youremail@hotmail.com" 
              isRequired
              onChange={handleChange} 
            />

            <FormLabel htmlFor="password" pt='2'>Password</FormLabel>
            <Input 
              variant='flushed'
              type="password" 
              name="password" 
              id="password" 
              placeholder="********"
              isRequired
              onChange={handleChange} />
          
            <Stack direction={['column', 'row']} spacing='24px' my='2' justify='center' align='center'>
              <Button
                colorScheme='green' 
                type='submit'>
                Login
              </Button>
              <Link to='/register'>You do not have an account? Sign up</Link>
            </Stack>
          </FormControl>
        </form>

        <Flex gap='4' alignItems='center' justifyContent='center' my='5'>
          <Button onClick={handleGoogleSignin} colorScheme='blue'>Login whit Google</Button>
          <Text color='red.600'>
            <a  href="#!" onClick={handleResetPassword}>Forgot Password?</a>
          </Text> 
        </Flex>
      </Box>
    </Flex>
  )
}

export default Login;