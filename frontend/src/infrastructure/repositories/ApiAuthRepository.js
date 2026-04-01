import api from "../api/Axios.js";

export class ApiAuthRepository {
  /*Funcion para consumir api de Registro del backend*/
  /*Recibe datos de el authContext */
  async Registro(UsuarioData) {
    const response = await api.post("/auth/registro", UsuarioData);
    return response.data;
  }

  /* Funcion para Consumir api de Login de usuario*/
  async Login(Credenciales) {
    try {
      const response = await api.post("/auth/login", Credenciales);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }

  

  async requestPasswordReset(email) {
    try {
      const response = await api.post("/auth/reset-password", { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al solicitar restablecimiento de contraseña");
    }
  }

  async resetPassword({newPassword }) {
    try {
      const response = await api.post("/auth/complete-reset", { newPassword });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al restablecer la contraseña");
    }
  }  
}
