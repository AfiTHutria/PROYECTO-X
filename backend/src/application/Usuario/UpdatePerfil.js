export class UpdatePerfil {
  constructor(usuarioSocialRepository) {
    this.usuarioSocialRepository = usuarioSocialRepository;
  }

  async ejecutar({ userId, patch }) {
    if (!userId) throw new Error("userId es obligatorio");
    if (!patch || typeof patch !== "object") throw new Error("patch inválido");
    return await this.usuarioSocialRepository.updatePerfil(userId, patch);
  }
}

