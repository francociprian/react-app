import { useAuth } from "../context/authContext";
import LoginLogo from '../assets/images/LoginLogo.png';
import { FiLogOut} from "react-icons/fi";
import { Text, Avatar, HStack, IconButton, Flex } from '@chakra-ui/react';
import ToogleDarkMode from "./toogleDarkMode/ToogleDarkMode";

function Home() {

  const { user, logout, loading } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) return <p>Loading...</p>

  return (
    <>
      <HStack w='100%' height='70px' justify='space-between' px='4'>
        <Text fontSize='xl'>React Aplication 💻</Text>
        <HStack direction='row'>
          <Text fontSize='xl'>{user.displayName || user.email}</Text>
          <Avatar 
            size='md' 
            src={user.photoURL ? user.photoURL : LoginLogo } 
            alt={user.displayName || user.email} 
          />
          <IconButton 
            size='md' 
            isRound='true' 
            onClick={handleLogout}
            icon={<FiLogOut/>}
            ></IconButton>
          <ToogleDarkMode />
        </HStack>
      </HStack>
      <Flex 
        height='80vh' 
        width='80vw'
        sx={{ margin: '0 auto'}}
        justify='center'
        align='center'
        >
        <Text as='ins' color='orange.300' fontSize='6xl'>Welcome to the app</Text>
      </Flex>
    </>
  )
}
export default Home;