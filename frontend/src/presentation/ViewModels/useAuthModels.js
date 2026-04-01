import { useState } from "react";
import { ApiAuthRepository } from "../../infrastructure/repositories/ApiAuthRepository.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

const authRepoInstance = new ApiAuthRepository();

export function useAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setIsCheckingSession } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (Credenciales) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authRepoInstance.Login(Credenciales);
      const { success, data } = response.data;

      if (success && data) {
        setUser(data);
        if (setIsCheckingSession) setIsCheckingSession(false);
        
        navigate("/home");
      } else {
        throw new Error("No se recibieron datos de usuario");
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Error al iniciar sesión";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin };
}

  

  
export function useResetPassword() {
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1);
  const [resetData, setResetData] = useState({ email: '', newPassword: '', code: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const sendEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await authRepository.requestPasswordReset(email); 
      setResetData((prev) => ({ ...prev, email: email }));
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const finalizeReset = async (password) => {
    setLoading(true);
    setError(null);
    try {
      await authRepository.resetPassword(password);
      navigate("/login", { 
        state: { message: "Contraseña restablecida exitosamente. Por favor, inicia sesión." } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { step, loading, error, sendEmail, finalizeReset };
}
