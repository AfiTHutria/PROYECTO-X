export class ListFollowing {
  constructor(usuarioSocialRepository) {
    this.usuarioSocialRepository = usuarioSocialRepository;
  }

  async ejecutar({ userId }) {
    if (!userId) throw new Error("userId es obligatorio");
    const following = await this.usuarioSocialRepository.listFollowing(userId);
    return following;
  }
}

