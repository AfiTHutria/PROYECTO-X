import api from "../sources/api/Axios.js";

export class ApiAuthRepository {

  /*Funcion para consumir api de Registro del backend*/
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

  /* Funcion para Consumir api de Login de usuario*/
  async Login(Credenciales) {
    try {
      const response = await api.post("/auth/login", Credenciales);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
  }
}
