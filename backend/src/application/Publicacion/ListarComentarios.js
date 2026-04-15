export class ListarComentariosPublicacion {
  constructor({ publicacionRepository, comentarioRepository }) {
    this.publicacionRepository = publicacionRepository;
    this.comentarioRepository = comentarioRepository;
  }

  async ejecutar({ id_publicacion }) {
    const idRaiz = await this.publicacionRepository.obtenerIdRaiz(id_publicacion);
    const comentarios = await this.comentarioRepository.listarPorPublicacion(idRaiz);
    return { idRaiz, comentarios };
  }
}

