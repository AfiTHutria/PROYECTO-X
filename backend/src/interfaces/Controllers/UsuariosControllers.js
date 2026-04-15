export class UsuariosControllers {
  constructor({ usuarioSocialRepository, getPerfilPublico, updatePerfil, toggleFollow, listFollowers, listFollowing }) {
    this.usuarioSocialRepository = usuarioSocialRepository;

    this.getPerfilPublico = getPerfilPublico;
    this.updatePerfil = updatePerfil;

    this.toggleFollowUseCase = toggleFollow;
    this.listFollowersUseCase = listFollowers;
    this.listFollowingUseCase = listFollowing;

    // 🔹 bind de métodos para Express
    this.getMe = this.getMe.bind(this);
    this.patchMe = this.patchMe.bind(this);
    this.getPerfil = this.getPerfil.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.listFollowers = this.listFollowers.bind(this);
    this.listFollowing = this.listFollowing.bind(this);
  }

  async getMe(req, res) {
    try {
      const viewerId = req.user?.id;

      const perfil = await this.getPerfilPublico.ejecutar({
        userId: viewerId,
        viewerId
      });

      return res.status(200).json({
        success: true,
        data: perfil
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async patchMe(req, res) {
    try {
      const userId = req.user?.id;
      const patch = req.body || {};

      const perfil = await this.updatePerfil.ejecutar({
        userId,
        patch
      });

      return res.status(200).json({
        success: true,
        data: perfil
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getPerfil(req, res) {
    try {
      const { id } = req.params;
      const viewerId = req.user?.id || null;

      const perfil = await this.getPerfilPublico.ejecutar({
        userId: id,
        viewerId
      });

      return res.status(200).json({
        success: true,
        data: perfil
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async toggleFollow(req, res) {
    try {
      const { id } = req.params;
      const followerId = req.user?.id;

      const result = await this.toggleFollowUseCase.ejecutar({
        followerId,
        followingId: id
      });

      const followers_count = await this.usuarioSocialRepository.countFollowers(id);

      return res.status(200).json({
        success: true,
        data: {
          ...result,
          followers_count
        }
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async listFollowers(req, res) {
    try {
      const { id } = req.params;

      const data = await this.listFollowersUseCase.ejecutar({
        userId: id
      });

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async listFollowing(req, res) {
    try {
      const { id } = req.params;

      const data = await this.listFollowingUseCase.ejecutar({
        userId: id
      });

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}