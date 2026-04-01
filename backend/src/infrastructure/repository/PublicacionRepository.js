import { supabase as defaultClient } from "../Supabase/supabase.js";

export class PublicacionRepository {
    constructor(supabaseClient) {
        // Inyectamos el cliente o usamos el por defecto
        this.supabase = supabaseClient || defaultClient;
        
        if (!this.supabase) {
            throw new Error("No se pudo inicializar Supabase en PublicacionRepository.");
        }
    }

    async crear(id_usuario, contenido) {
        const { data, error } = await this.supabase
            .from('publicacion')
            .insert([{ id_usuario, contenido }])
            .select(`
                *,
                usuarios(Nombre, avatar_url)
            `)
            .single();

        if (error) throw this._handleError(error, "CrearPublicacion");
        return data;
    }

    async obtenerTodas() {
        const { data, error } = await this.supabase
            .from('publicacion')
            .select(`
                *,
                usuarios(Nombre, avatar_url)
            `)
            .order('created_at', { ascending: false });

        if (error) throw this._handleError(error, "ObtenerPublicaciones");
        return data;
    }

    // Método privado para manejar errores de forma centralizada
    _handleError(error, context) {
        console.error(`[${context}] Error:`, error);
        return new Error(error.message || "Error inesperado en el repositorio de publicaciones.");
    }
}