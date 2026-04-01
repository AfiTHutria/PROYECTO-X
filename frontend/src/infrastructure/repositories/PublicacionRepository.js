import api from "../api/Axios";

export class PostRepository{
    async crear(userId, contenido) {
        try {
            // El endpoint debe coincidir con tu backend en Node
            const response = await api.post('/publicaciones', {
                id_usuario: userId,
                contenido: contenido
            });
            return response.data; // Retorna la publicación creada
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al conectar con el servidor");
        }
    }
    async listar() {
        try {
            const response = await api.get('/publicaciones');
            return response.data; // Retorna el array de posts con sus usuarios
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al cargar las publicaciones");
        }
    }
}
export const PublicacionRepository = new PostRepository();