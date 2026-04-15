export class ListFollowers {
  constructor(usuarioSocialRepository) {
    this.usuarioSocialRepository = usuarioSocialRepository;
  }

  async ejecutar({ userId }) {
    if (!userId) throw new Error("userId es obligatorio");
    const followers = await this.usuarioSocialRepository.listFollowers(userId);
    return followers;
  }
}

