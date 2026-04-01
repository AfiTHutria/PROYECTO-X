import { supabase } from "../../infrastructure/Supabase/supabase";

export const AuthMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return res.status(401).json({ succes: false, message: "No hay sesion activa. Por favor, inicie sesion."});
    }

    try{
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            res.clearCookie('access_token');
            return res.status(401).json({ succes: false, message: "Sesión expirada. Por favor, inicie sesión nuevamente."});
            
        }
        req.user=user;
        next();
    }catch (error){
        res.clearCookie('access_token');
        return res.status(401).json({ succes: false, message: "Error de autenticación. Por favor, inicie sesión nuevamente."});
    }
};