export class ResetPasswordUsuario{
    constructor(usuarioRepository){
        this.repository= usuarioRepository;
    }
    async solicitarReset(email) {
    if (!email) throw new Error("El email es obligatorio");
    return await this.repository.enviarEmailRecuperacion(email);
  }

  

  async completarReset( nuevaPassword) {
    if (nuevaPassword.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");
    return await this.repository.actualizarPassword( nuevaPassword);
  }
}