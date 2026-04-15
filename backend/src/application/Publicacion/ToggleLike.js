export class ToggleLikePublicacion {
  constructor({ publicacionRepository, likeRepository }) {
    this.publicacionRepository = publicacionRepository;
    this.likeRepository = likeRepository;
  }

  async ejecutar({ id_publicacion, id_usuario }) {
    const idRaiz = await this.publicacionRepository.obtenerIdRaiz(id_publicacion);

    const yaLike = await this.likeRepository.existeLike({
      publicacion_id: idRaiz,
      id_usuario,
    });

    if (yaLike) {
      await this.likeRepository.borrarLike({ publicacion_id: idRaiz, id_usuario });
      const likes_count = await this.publicacionRepository.incrementarContador(idRaiz, "likes_count", -1);
      return { idRaiz, liked: false, likes_count };
    }

    await this.likeRepository.crearLike({ publicacion_id: idRaiz, id_usuario });
    const likes_count = await this.publicacionRepository.incrementarContador(idRaiz, "likes_count", 1);
    return { idRaiz, liked: true, likes_count };
  }
}

