import { useAuth } from "../context/authContext"
import { Navigate }  from "react-router-dom"

export function ProtectedRoute({ children }) {
    const {user, loading} = useAuth()
    
    if(loading) return <p>Loading...</p>
    
    if(!user) return <Navigate to="/login" />

    return <>{children}</>
}

export default ProtectedRoute