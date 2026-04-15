export class ToggleFollow {
  constructor(usuarioSocialRepository) {
    this.usuarioSocialRepository = usuarioSocialRepository;
  }

  async ejecutar({ followerId, followingId }) {
    if (!followerId) throw new Error("followerId es obligatorio");
    if (!followingId) throw new Error("followingId es obligatorio");
    if (followerId === followingId) throw new Error("No puedes seguirte a ti mismo");

    const ya = await this.usuarioSocialRepository.isFollowing({ followerId, followingId });
    if (ya) {
      await this.usuarioSocialRepository.unfollow({ followerId, followingId });
      return { following: false };
    }
    await this.usuarioSocialRepository.follow({ followerId, followingId });
    return { following: true };
  }
}

