
export class SessionControllers {
    constructor(getCurrentUserUseCase, logoutUseCase, refreshTokenUseCase) {
        this.getCurrentUserUseCase = getCurrentUserUseCase;
        this.logoutUseCase = logoutUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
    }

    async getCurrentUser(req, res) {
        try {

            const user = await this.getCurrentUserUseCase.execute(req.user);

            if(!user){
                return res.status(404).json({ success: false, message: "Usuario no encontrado." });
            }

            return res.status(200).json({ 
                success: true, 
                user:{
                    id:user.id,
                    Email: user.Email,
                    Nombre: user.Nombre,
                    avatar_url: user.avatar_url||null,
                    created_at: user.created_at,
                    display_name: user.display_name||user.Nombre,
                } 
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error al obtener el usuario actual." });
        }
    }

    async logout(req, res) {
        try{
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/'
            });
            res.clearCookie('refresh_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/'
            });
            res.status(200).json({ success: true, message: "Sesión cerrada correctamente." });
        }catch(error){
            res.status(500).json({ success: false, message: "Error al cerrar sesión." });
        }
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refresh_token;
            const session = await this.refreshTokenUseCase.execute(refreshToken);
            if (!session) {
                return res.status(401).json({ success: false, message: "No se pudo refrescar la sesión." });
            }

            res.cookie('access_token', session.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24,
                path: '/'
            });
            res.cookie('refresh_token', session.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/'
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al refrescar sesión." });
        }
    }
}