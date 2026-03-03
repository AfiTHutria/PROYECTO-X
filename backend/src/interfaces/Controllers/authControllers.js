export class AuthControllers {
    constructor(registroUsuario, loginUsuario) {
        this.registroUsuario = registroUsuario;
        this.loginUsuario = loginUsuario;
    }

    Registro =async(req, res) => {
        try {
            const {Nombre, Telefono, FechaNacimiento, Email, Contraseña} = req.body;
            const Usuario= await this.registroUsuario.execute({Nombre, Telefono, FechaNacimiento, Email, Contraseña});
            res.status(201).json({
                succes: true,
                data: Usuario
            });
        }catch (error){
            res.status(400).json({
                succes: false,
                message: error.message
            });
        }
    }
}