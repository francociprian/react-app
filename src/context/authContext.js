import { 
  createContext, 
  useContext, 
  useEffect,
  useState 
} from "react";
import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from "../Firebase/Credentials";

export const authContext = createContext()

export const useAuth = () => {
  const context =  useContext(authContext)
  if (!context) throw new Error("There is not Auth Provider")
  return context
}

export function AuthProvider({children}) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const logout = () => signOut(auth);
  const loginWhitGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    });
    return () => unsuscribe()
  }, [])

  return (
      <authContext.Provider value={{ signup, login, user, logout, loading, loginWhitGoogle, resetPassword }}>
          {children}
      </authContext.Provider>
  )
}
