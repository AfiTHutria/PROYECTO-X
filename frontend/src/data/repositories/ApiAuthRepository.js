import api from "../sources/api/Axios.js";

export class ApiAuthRepository {
  async Registro(UsuarioData) {
    try {
      const response = await api.post("/auth/registro", UsuarioData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Error al registrar usuario",
      );
    }
  }
  async Login(Credenciales) {
    try {
      const response = await api.post("/auth/login", Credenciales);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
}
