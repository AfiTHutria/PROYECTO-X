export class GetPerfilPublico {
  constructor(usuarioSocialRepository) {
    this.usuarioSocialRepository = usuarioSocialRepository;
  }

  async ejecutar({ userId, viewerId = null }) {
    if (!userId) throw new Error("userId es obligatorio");
    return await this.usuarioSocialRepository.getPerfilPublico(userId, viewerId);
  }
}

