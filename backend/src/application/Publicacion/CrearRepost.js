export class CrearRepostPublicacion {
  constructor({ publicacionRepository }) {
    this.publicacionRepository = publicacionRepository;
  }

  async ejecutar({ id_publicacion, id_usuario, contenido = "" }) {
    const idRaiz = await this.publicacionRepository.obtenerIdRaiz(id_publicacion);

    const repost = await this.publicacionRepository.crearRepost({
      id_usuario,
      id_publicacion_original: idRaiz,
      contenido: contenido?.trim?.() ?? "",
    });

    const reposts_count = await this.publicacionRepository.incrementarContador(
      idRaiz,
      "reposts_count",
      1,
    );

    return { idRaiz, repost, reposts_count };
  }
}

