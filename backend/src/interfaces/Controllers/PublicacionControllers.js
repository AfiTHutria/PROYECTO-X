export class PublicacionControllers {
    constructor(publicacionUseCase) {
        this.publicacionUseCase = publicacionUseCase;
    }

    async crearPublicacion(req, res) {
        try {
            const { id_usuario, contenido } = req.body;

            // Llamamos a la capa de aplicación usando la instancia inyectada
            const nuevaPublicacion = await this.publicacionUseCase.ejecutar(id_usuario, contenido);

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
            // Llamamos al método del caso de uso
            const publicaciones = await this.publicacionUseCase.obtenerFeed();
            
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