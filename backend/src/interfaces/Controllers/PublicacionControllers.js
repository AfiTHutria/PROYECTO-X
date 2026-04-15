export class PublicacionControllers {
    constructor(publicacionUseCase) {
        this.publicacionUseCase = publicacionUseCase;
    }

    async crearPublicacion(req, res) {
        try {
            const { id_usuario, contenido } = req.body;
            const idUsuarioFinal = req.user?.id || id_usuario;

            // Llamamos a la capa de aplicación usando la instancia inyectada
            const nuevaPublicacion = await this.publicacionUseCase.ejecutar(idUsuarioFinal, contenido);

            return res.status(201).json({
                success: true,
                data: nuevaPublicacion
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    async listarPublicaciones(req, res) {
        try {
            const idUsuario = req.user?.id || null;
            const publicaciones = await this.publicacionUseCase.obtenerFeed(idUsuario);
            
            return res.status(200).json({
                success: true,
                data: publicaciones
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
}