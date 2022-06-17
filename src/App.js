import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/Register';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return(
    // <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
    //   <AuthProvider>
    //     <Routes>
    //       <Route path="/" element={
    //         <ProtectedRoute>
    //           <Home />
    //         </ProtectedRoute>} 
    //       />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //     </Routes>
    //   </AuthProvider>
    // </Box>

    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  )
}
export default App;
