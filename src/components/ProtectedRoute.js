import { useAuth } from "../context/authContext"
import { Navigate }  from "react-router-dom"
import Load from "./Load"

export function ProtectedRoute({ children }) {
    const {user, loading} = useAuth()
    if(loading) return <Load />
    
    if(!user) return <Navigate to="/login" />

    return <>{children}</>
}

export default ProtectedRoute