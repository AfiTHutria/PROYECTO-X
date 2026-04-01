import { createContext, useState, useEffect, useContext } from "react";
import {useNavigate } from 'react-router-dom';
import { ApiAuthRepository } from "../infrastructure/repositories/ApiAuthRepository";

export const AuthContext = createContext();
const AuthRepository = new ApiAuthRepository();

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate();

    const [TempData, setTempData]= useState({
        Nombre: '',      
        Email: '',
        Telefono: '',
        FechaNacimiento: '',
        Contraseña: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTempData = (fields) =>{
        setTempData((prev) => ({...prev, ...fields}))
    };

    const registerUser = async() =>{
        setLoading(true);
        setError(null);

        try {
            const response = await AuthRepository.Registro(TempData);
            if (response.status === 201 || response.status === 200){
                navigate('waiting-confirmation');
            }
        }catch(err){
            const message = err.response?.data?.message || 'Error al procesar el registro'
            setError(message);
        }finally{
            setLoading(false);
        }
    };

    
    return(
    <AuthContext.Provider value={{TempData,updateTempData,registerUser,loading,error}}>
        {children}
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