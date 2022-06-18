import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link }  from "react-router-dom";
import { Input, FormLabel, FormControl, Box, Button, Text, Flex, Stack} from '@chakra-ui/react'
import Alert from "./Alert";
import ToogleDarkMode from './toogleDarkMode/ToogleDarkMode';
import SwiperSlider from "./swiperSlider/SwiperSlider";


import { InputGroup, InputRightElement, IconButton  } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'


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

  // PASSWORD
  const [show, setShow] = useState(false)
  const handleClickShowPassword = () => setShow(!show)

  return (
    <Flex h='100vh' w='100vw' align='center' justify='center' gap='5'>
      <SwiperSlider /> 
      <Flex direction='column' h='100%'>
        <Flex h='30%' justify='flex-end' p='3'><ToogleDarkMode /></Flex>
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
          <Text fontSize='6xl' fontWeight='bold'>Login</Text>
          <Flex direction='column' w='70%'>
            <form onSubmit={handleSubmit}>
              <FormControl display='flex' flexDirection='column'>

                <FormLabel htmlFor="email" pt='2' fontSize='2xl' fontWeight='thin'>Email</FormLabel>
                <Input 
                  variant='outline'
                  size='lg'
                  id="email"
                  type="email" 
                  name="email"
                  placeholder="youremail@hotmail.com" 
                  isRequired
                  onChange={handleChange} 
                />

                <FormLabel htmlFor="password" pt='2' fontSize='2xl' fontWeight='thin' >Password</FormLabel>
                <InputGroup id="password" size='lg' variant='outline' onChange={handleChange}>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    name='password'
                    placeholder='********'
                  />
                  <InputRightElement 
                    // width='4.5rem' 
                    >
                    <IconButton 
                        size='sm' 
                        icon={show ? <ViewOffIcon /> : <ViewIcon color='gray.100' />  }
                        isRound='true'
                        onClick={handleClickShowPassword}
                    ></IconButton>
                    {/* <Button
                      // h='1.75rem'  
                      size='sm' onClick={handleClickShowPassword}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button> */}
                  </InputRightElement>
                </InputGroup>

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
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Login;