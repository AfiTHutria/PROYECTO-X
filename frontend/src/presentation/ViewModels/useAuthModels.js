import { useState } from "react";
import { ApiAuthRepository } from "../../data/repositories/ApiAuthRepository.js";

export function useAuthModels(usuarioRepository) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const authRepository = new ApiAuthRepository(usuarioRepository);

  const handleRegistro = async (UsuarioData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authRepository.Registro(UsuarioData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleRegistro,
  };
}
