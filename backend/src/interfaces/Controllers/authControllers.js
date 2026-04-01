export class AuthControllers {
    constructor(registroUsuario, loginUsuario, ResetPasswordUsuario) {
        this.registroUsuario = registroUsuario;
        this.loginUsuario = loginUsuario;
        this.ResetPasswordUsuario=ResetPasswordUsuario;
    }

    Registro =async(req, res) => {
        try {
            const Usuario = await this.registroUsuario.execute(req.body);
            res.status(201).json({
                success: true,
                data: Usuario
            });
        }catch (error){
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    Login = async(req, res) => {
        try{
            const Usuario = await this.loginUsuario.execute(req.body);

            const {token,refreshToken,user} = Usuario;

            res.cookie('access_token',token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24,
                path: '/'
                
            })
            res.cookie('refresh_token',refreshToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                
            })
            res.status(200).json({
                success: true,
                data: user
            });
        }
        catch (error){
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    RequestReset = async (req, res) => {
        try {
            const { email } = req.body;
            await this.ResetPasswordUsuario.solicitarReset(email);
            res.status(200).json({
                success: true,
                message: "Email de recuperación enviado"
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    CompleteReset = async (req, res) => {
        try {
            const {  newPassword } = req.body;
            await this.ResetPasswordUsuario.completarReset( newPassword);
            res.status(200).json({
                success: true,
                message: "Contraseña actualizada exitosamente"
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}