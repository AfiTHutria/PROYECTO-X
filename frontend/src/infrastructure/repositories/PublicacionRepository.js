import api from "../api/Axios";

export class PostRepository{
    async crear(userId, contenido) {
        try {
            const response = await api.post('/publicaciones', {
                id_usuario: userId,
                contenido: contenido
            });
            return response.data?.data ?? response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al conectar con el servidor");
        }
    }
    async listar() {
        try {
            const response = await api.get('/publicaciones');
            return response.data?.data ?? response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al cargar las publicaciones");
        }
    }

    async toggleLike(publicacionId) {
        try {
            const response = await api.post(`/publicaciones/${publicacionId}/like`);
            return response.data?.data ?? response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al actualizar el like");
        }
    }

    async listarComentarios(publicacionId) {
        try {
            const response = await api.get(`/publicaciones/${publicacionId}/comentarios`);
            return response.data?.data ?? response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al cargar comentarios");
        }
    }

    async crearComentario(publicacionId, contenido) {
        try {
            const response = await api.post(`/publicaciones/${publicacionId}/comentarios`, { contenido });
            return response.data?.data ?? response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al publicar el comentario");
        }
    }

    async repost(publicacionId, contenido = "") {
        try {
            const response = await api.post(`/publicaciones/${publicacionId}/repost`, { contenido });
            return response.data?.data ?? response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al repostear");
        }
    }
}
export const PublicacionRepository = new PostRepository();