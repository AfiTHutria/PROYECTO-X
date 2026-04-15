export class Publicacion {
    constructor({ id_usuario, contenido, imagen_url, likes_count, id_publicacion_original }) {
        this.id_usuario = id_usuario;
        this.contenido = contenido;
        this.imagen_url = imagen_url;
        this.likes_count = likes_count || 0;
        this.id_publicacion_original = id_publicacion_original ?? null;
    }

    validarContenido() {
        const esRepost = Boolean(this.id_publicacion_original);
        const texto = (this.contenido || "").trim();

        if (!esRepost && texto.length === 0) {
            throw new Error("El contenido no puede estar vacío.");
        }
        if (texto.length > 280) {
            throw new Error("La publicación supera los 280 caracteres.");
        }
        return true;
    }
}