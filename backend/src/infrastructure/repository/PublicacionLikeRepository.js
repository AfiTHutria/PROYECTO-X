import { supabase as defaultClient } from "../Supabase/supabase.js";

export class PublicacionLikeRepository {
  constructor(supabaseClient) {
    this.supabase = supabaseClient || defaultClient;
    if (!this.supabase) {
      throw new Error("No se pudo inicializar Supabase en PublicacionLikeRepository.");
    }
  }

  async existeLike({ publicacion_id, id_usuario }) {
    const { data, error } = await this.supabase
      .from("publicacion_like")
      .select("id")
      .eq("publicacion_id", publicacion_id)
      .eq("id_usuario", id_usuario)
      .maybeSingle();

    if (error) throw this._handleError(error, "ExisteLike");
    return Boolean(data?.id);
  }

  async crearLike({ publicacion_id, id_usuario }) {
    const { data, error } = await this.supabase
      .from("publicacion_like")
      .insert([{ publicacion_id, id_usuario }])
      .select("id")
      .single();

    if (error) throw this._handleError(error, "CrearLike");
    return data;
  }

  async borrarLike({ publicacion_id, id_usuario }) {
    const { error } = await this.supabase
      .from("publicacion_like")
      .delete()
      .eq("publicacion_id", publicacion_id)
      .eq("id_usuario", id_usuario);

    if (error) throw this._handleError(error, "BorrarLike");
    return true;
  }

  _handleError(error, context) {
    console.error(`[${context}] Error:`, error);
    return new Error(error.message || "Error inesperado en el repositorio de likes.");
  }
}

