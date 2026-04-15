import { createContext, useState, useEffect, useContext } from "react";
import {useNavigate } from 'react-router-dom';
import { ApiAuthRepository } from "../infrastructure/repositories/ApiAuthRepository";
import { SessionRepository } from "../infrastructure/repositories/SessionRepository";
import LoadingScreen  from "../presentation/components/ui/Spinners/LoadingScreen";

export const AuthContext = createContext();
const AuthRepository = new ApiAuthRepository();
const SessionRepo= new SessionRepository();

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [TempData, setTempData]= useState({
        Nombre: '',      
        Email: '',
        Telefono: '',
        FechaNacimiento: '',
        Contraseña: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const verifySession = async () => {
    setIsCheckingSession(true);
    try {
        const response = await SessionRepo.getCurrentUser();
        
        // El servidor envía 'success' y 'user', NO 'data'
        const { success, user } = response.data; 

        if (success && user) {
            console.log("¡ÉXITO! Usuario cargado:", user);
            setUser(user); // Guardamos 'user'
        } else {
            console.warn("SESIÓN FALLIDA: No se encontró el objeto 'user'");
            setUser(null);
        }
    } catch (error) {
        console.error("ERROR EN VERIFY SESSION:", error);
        setUser(null);
    } finally {
        setIsCheckingSession(false);
    }
    };
    useEffect(() => {
        verifySession();
    }, []);

    const updateTempData = (fields) =>{
        setTempData((prev) => ({...prev, ...fields}))
    };

    const registerUser = async() =>{
        setLoading(true);
        setError(null);

        try {
            const response = await AuthRepository.Registro(TempData);
            if (response.status === 201 || response.status === 200){
                navigate('/home');
            }
        }catch(err){
            const message = err.response?.data?.message || 'Error al procesar el registro'
            setError(message);
        }finally{
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await SessionRepo.logout();
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error("Error al salir");
        }
    };
    
    return(
    <AuthContext.Provider value={{TempData,updateTempData,registerUser,loading,error,user,setUser,logout,isCheckingSession,setIsCheckingSession,verifySession}}>
        {isCheckingSession ? (
            <LoadingScreen />
        ) : children}
    </AuthContext.Provider>
    );  
}

export const useAuth = ()=>{    
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};