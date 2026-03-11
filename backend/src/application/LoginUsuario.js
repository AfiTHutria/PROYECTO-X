export class LoginUsuario {
    constructor(usurioRepository){
        this.usuarioRepository = usurioRepository;
    }

    async execute(Credenciales){
        if(!Credenciales.Email || !Credenciales.Contraseña){
            throw new Error('Todos los campos son obligatorios');
        }
        const usuario = await this.usuarioRepository.Login(Credenciales);
        
        return usuario;
    }
}