import { Publicacion as PublicacionEntity } from "../domain/Publicacion.js";

export class Publicacion {
  constructor(repository) {
    this.repository = repository;
  }

  async ejecutar(id_usuario, contenido) {
    // 1. Validaciones iniciales siguiendo el estilo de RegistroUsuario
    if (!id_usuario) {
      throw new Error("El ID de usuario es obligatorio");
    }

    if (!contenido || contenido.trim() === "") {
      throw new Error("El contenido no puede estar vacío");
    }

    // 2. Instanciamos la entidad de dominio para aplicar reglas de negocio
    // (Ejemplo: el límite de 280 caracteres que definimos en el dominio)
    const nuevaPublicacion = new PublicacionEntity({
      id_usuario,
      contenido: contenido.trim(),
    });

    // Ejecutamos validación propia del dominio si existe
    nuevaPublicacion.validarContenido();

    // 3. Persistencia a través del repositorio inyectado
    return await this.repository.crear(
      nuevaPublicacion.id_usuario,
      nuevaPublicacion.contenido,
    );
  }

  async obtenerFeed(idUsuario = null) {
    return await this.repository.obtenerTodasEnriquecidas(idUsuario);
  }
}
