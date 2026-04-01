export class Publicacion {
    constructor({ id_usuario, contenido, imagen_url, likes_count }) {
        this.id_usuario = id_usuario;
        this.contenido = contenido;
        this.imagen_url = imagen_url;
        this.likes_count = likes_count || 0;
    }

    // ¡ESTE ES EL MÉTODO QUE FALTA!
    validarContenido() {
        if (!this.contenido || this.contenido.trim().length === 0) {
            throw new Error("El contenido no puede estar vacío.");
        }
        if (this.contenido.length > 280) {
            throw new Error("La publicación supera los 280 caracteres.");
        }
        return true;
    }
}