import { supabase as defaultClient } from "../Supabase/supabase.js";

export class PublicacionComentarioRepository {
  constructor(supabaseClient) {
    this.supabase = supabaseClient || defaultClient;
    if (!this.supabase) {
      throw new Error("No se pudo inicializar Supabase en PublicacionComentarioRepository.");
    }
  }

  async listarPorPublicacion(publicacion_id) {
    const { data, error } = await this.supabase
      .from("publicacion_comentario")
      .select(`
        *,
        usuarios(id, Nombre, avatar_url)
      `)
      .eq("publicacion_id", publicacion_id)
      .order("created_at", { ascending: true });

    if (error) throw this._handleError(error, "ListarComentarios");
    return data || [];
  }

  async crear({ publicacion_id, id_usuario, contenido }) {
    const { data, error } = await this.supabase
      .from("publicacion_comentario")
      .insert([{ publicacion_id, id_usuario, contenido }])
      .select(`
        *,
        usuarios(id, Nombre, avatar_url)
      `)
      .single();

    if (error) throw this._handleError(error, "CrearComentario");
    return data;
  }

  _handleError(error, context) {
    console.error(`[${context}] Error:`, error);
    return new Error(error.message || "Error inesperado en el repositorio de comentarios.");
  }
}

