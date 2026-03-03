import { Usuario } from "../domain/Usuario.js";

export class RegistroUsuario {
  constructor(repo) {
    this.repo = repo;
  }
  async execute(UsuarioData) {

    if (
      !UsuarioData.Nombre ||
      !UsuarioData.Telefono ||
      !UsuarioData.FechaNacimiento ||
      !UsuarioData.Email ||
      !UsuarioData.Contraseña
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (UsuarioData.Contraseña.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    return await this.repo.registrarUsuario(UsuarioData);
  }
}
