import { useState } from "react";
import { ApiAuthRepository } from "../../infrastructure/repositories/ApiAuthRepository.js";
import { useNavigate } from "react-router-dom";

const authRepository = new ApiAuthRepository();

export function useAuthLogin(usuarioRepository) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (Credenciales) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authRepository.Login(Credenciales);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, success, handleLogin };
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
