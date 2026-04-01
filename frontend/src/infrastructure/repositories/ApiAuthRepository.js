import api from "../api/Axios.js";

export class ApiAuthRepository {
  async Registro(UsuarioData) {
    const response = await api.post("/auth/registro", UsuarioData);
    return response;
  }
  async Login(Credenciales) {
    try {
      const response = await api.post("/auth/login", Credenciales);
      return response
    } catch (error) {
      throw error;
    }
  }
  async requestPasswordReset(email) {
    try {
      const response = await api.post("/auth/reset-password", { email });
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al solicitar restablecimiento de contraseña");
    }
  }
  async resetPassword({newPassword }) {
    try {
      const response = await api.post("/auth/complete-reset", { newPassword });
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al restablecer la contraseña");
    }
  }  
}
