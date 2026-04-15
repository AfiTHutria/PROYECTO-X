export class CrearComentarioPublicacion {
  constructor({ publicacionRepository, comentarioRepository }) {
    this.publicacionRepository = publicacionRepository;
    this.comentarioRepository = comentarioRepository;
  }

  async ejecutar({ id_publicacion, id_usuario, contenido }) {
    if (!contenido || contenido.trim() === "") {
      throw new Error("El comentario no puede estar vacío");
    }

    const idRaiz = await this.publicacionRepository.obtenerIdRaiz(id_publicacion);

    const comentario = await this.comentarioRepository.crear({
      publicacion_id: idRaiz,
      id_usuario,
      contenido: contenido.trim(),
    });

    const comentarios_count = await this.publicacionRepository.incrementarContador(
      idRaiz,
      "comentarios_count",
      1,
    );

    return { idRaiz, comentario, comentarios_count };
  }
}

