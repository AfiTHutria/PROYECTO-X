import { emitToPublicacion } from "../../infrastructure/realtime/socket.js";

export class PublicacionInteraccionControllers {
  constructor({ toggleLikeUseCase, listarComentariosUseCase, crearComentarioUseCase, crearRepostUseCase }) {
    this.toggleLikeUseCase = toggleLikeUseCase;
    this.listarComentariosUseCase = listarComentariosUseCase;
    this.crearComentarioUseCase = crearComentarioUseCase;
    this.crearRepostUseCase = crearRepostUseCase;
  }

  async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const id_usuario = req.user?.id;

      const result = await this.toggleLikeUseCase.ejecutar({ id_publicacion: id, id_usuario });

      emitToPublicacion(result.idRaiz, "publicacion:like", {
        publicacionIdRaiz: result.idRaiz,
        likes_count: result.likes_count,
        likedByUserId: id_usuario,
        liked: result.liked,
        sourcePublicacionId: id,
      });

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async listarComentarios(req, res) {
    try {
      const { id } = req.params;
      const result = await this.listarComentariosUseCase.ejecutar({ id_publicacion: id });
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async crearComentario(req, res) {
    try {
      const { id } = req.params;
      const id_usuario = req.user?.id;
      const { contenido } = req.body;

      const result = await this.crearComentarioUseCase.ejecutar({
        id_publicacion: id,
        id_usuario,
        contenido,
      });

      emitToPublicacion(result.idRaiz, "publicacion:comentario", {
        publicacionIdRaiz: result.idRaiz,
        comentario: result.comentario,
        comentarios_count: result.comentarios_count,
        sourcePublicacionId: id,
      });

      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async crearRepost(req, res) {
    try {
      const { id } = req.params;
      const id_usuario = req.user?.id;
      const { contenido } = req.body || {};

      const result = await this.crearRepostUseCase.ejecutar({
        id_publicacion: id,
        id_usuario,
        contenido,
      });

      const nuevaPublicacion = {
        ...result.repost,
        id_publicacion_raiz: result.idRaiz,
        liked_by_me: false,
      };

      emitToPublicacion(result.idRaiz, "publicacion:repost", {
        publicacionIdRaiz: result.idRaiz,
        reposts_count: result.reposts_count,
        nuevaPublicacion,
        sourcePublicacionId: id,
      });

      return res.status(201).json({
        success: true,
        data: {
          ...result,
          repost: nuevaPublicacion,
        },
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

