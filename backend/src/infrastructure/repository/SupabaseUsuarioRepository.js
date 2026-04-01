import { supabase as defaultClient } from "../Supabase/supabase.js";

export class SupabaseUsuarioRepository {
    constructor(supabaseClient) {
        this.supabase = supabaseClient || defaultClient;
        if (!this.supabase) {
            throw new Error(" No se pudo inicializar Supabase. Verifica la ruta de importación.");
        }
    }
    async registrarUsuario({ Email, Contraseña, Nombre, Telefono, FechaNacimiento }) {
        // 1. Auth SignUp
        const { data: authData, error: authError } = await this.supabase.auth.signUp({
            email: Email,
            password: Contraseña,
            options: {
                
                emailRedirectTo: 'http://localhost:5173/Inicio',
            }
        });

        if (authError) throw this._handleError(authError, "AuthRegistration");
        const { data: perfilData, error: perfilError } = await this.supabase
            .from('usuarios')
            .insert([{
                id: authData.user.id,
                Nombre,
                Telefono,
                FechaNacimiento: FechaNacimiento || new Date().toISOString(),
                Email: Email,
            }])
            .select()
            .single();

        if (perfilError) throw this._handleError(perfilError, "ProfileInsertion");

        return { user: authData.user, profile: perfilData };
    }
    async Login({ Email, Contraseña }) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: Email,
            password: Contraseña,
        });

        if (error) throw new Error("Credenciales inválidas. Por favor, verifica tus datos.");
        const { data: perfil } = await this.supabase
            .from('usuarios')
            .select('username, avatar_url')
            .eq('id', data.user.id)
            .single();

        return {
            token: data.session.access_token,
            refreshToken: data.session.refresh_token,
            user: {
                id: data.user.id,
                email: data.user.email,
                username: perfil?.username || "Usuario",
                avatar: perfil?.avatar_url || null,
                lastLogin: data.user.last_sign_in_at

            }
        };
    }
    async enviarEmailRecuperacion(email) {
        if (!email) throw new Error("El correo electrónico es requerido.");

        const { data,error } = await this.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/reset-password' 
        });

        if (error) throw this._handleError(error, "ResetPassword");
        return { success: true };
    }
    async actualizarPassword( nuevaPassword) {
        const { data, error } = await this.supabase.auth.updateUser({
            password: nuevaPassword
        });
        if (error) throw this._handleError(error, "ChangePassword");
        return data;
    }
   _handleError(error, context) {
        console.error(`[${context}] Error detallado:`, error);
        if (error.status === 429) return new Error("Demasiadas solicitudes. Espera un momento.");
        if (error.code === '23505') return new Error("Este registro ya existe.");
        
        return new Error(error.message || "Ocurrió un error inesperado.");
    }
}