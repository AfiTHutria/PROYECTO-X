import { supabase as defaultClient } from "../Supabase/supabase.js";

export class UsuarioSocialRepository {
  constructor(supabaseClient) {
    this.supabase = supabaseClient || defaultClient;
    if (!this.supabase) {
      throw new Error("No se pudo inicializar Supabase en UsuarioSocialRepository.");
    }
  }

  async getPerfilPublico(userId, viewerId = null) {
    const { data: perfil, error } = await this.supabase
      .from("usuarios")
      .select("id, Nombre, username, avatar_url, banner_url, bio, location, website, created_at")
      .eq("id", userId)
      .single();

    if (error) throw this._handleError(error, "GetPerfilPublico");

    const [followersCount, followingCount, publicacionesCount, isFollowing] = await Promise.all([
      this.countFollowers(userId),
      this.countFollowing(userId),
      this.countPublicaciones(userId),
      viewerId ? this.isFollowing({ followerId: viewerId, followingId: userId }) : Promise.resolve(false),
    ]);

    return {
      ...perfil,
      followers_count: followersCount,
      following_count: followingCount,
      publicaciones_count: publicacionesCount,
      is_followed_by_me: Boolean(isFollowing),
    };
  }

  async countPublicaciones(userId) {
    const { count, error } = await this.supabase
      .from("publicacion")
      .select("id", { count: "exact", head: true })
      .eq("id_usuario", userId);

    if (error) throw this._handleError(error, "CountPublicaciones");
    return count ?? 0;
  }

  async updatePerfil(userId, patch) {
    const allowed = ["Nombre", "username", "avatar_url", "banner_url", "bio", "location", "website"];
    const clean = {};
    for (const k of allowed) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) clean[k] = patch[k];
    }

    const { data, error } = await this.supabase
      .from("usuarios")
      .update(clean)
      .eq("id", userId)
      .select("id, Nombre, username, avatar_url, banner_url, bio, location, website, created_at")
      .single();

    if (error) throw this._handleError(error, "UpdatePerfil");
    return data;
  }

  async countFollowers(userId) {
    const { count, error } = await this.supabase
      .from("usuario_follow")
      .select("id", { count: "exact", head: true })
      .eq("following_id", userId);

    if (error) throw this._handleError(error, "CountFollowers");
    return count ?? 0;
  }

  async countFollowing(userId) {
    const { count, error } = await this.supabase
      .from("usuario_follow")
      .select("id", { count: "exact", head: true })
      .eq("follower_id", userId);

    if (error) throw this._handleError(error, "CountFollowing");
    return count ?? 0;
  }

  async listFollowers(userId) {
    const { data, error } = await this.supabase
      .from("usuario_follow")
      .select("follower:usuarios!usuario_follow_follower_id_fkey(id, Nombre, username, avatar_url)")
      .eq("following_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw this._handleError(error, "ListFollowers");
    return (data || []).map((r) => r.follower).filter(Boolean);
  }

  async listFollowing(userId) {
    const { data, error } = await this.supabase
      .from("usuario_follow")
      .select("following:usuarios!usuario_follow_following_id_fkey(id, Nombre, username, avatar_url)")
      .eq("follower_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw this._handleError(error, "ListFollowing");
    return (data || []).map((r) => r.following).filter(Boolean);
  }

  async isFollowing({ followerId, followingId }) {
    const { data, error } = await this.supabase
      .from("usuario_follow")
      .select("id")
      .eq("follower_id", followerId)
      .eq("following_id", followingId)
      .maybeSingle();

    if (error) throw this._handleError(error, "IsFollowing");
    return Boolean(data?.id);
  }

  async follow({ followerId, followingId }) {
    const { data, error } = await this.supabase
      .from("usuario_follow")
      .insert([{ follower_id: followerId, following_id: followingId }])
      .select("id")
      .single();

    if (error) throw this._handleError(error, "Follow");
    return data;
  }

  async unfollow({ followerId, followingId }) {
    const { error } = await this.supabase
      .from("usuario_follow")
      .delete()
      .eq("follower_id", followerId)
      .eq("following_id", followingId);

    if (error) throw this._handleError(error, "Unfollow");
    return true;
  }

  _handleError(error, context) {
    console.error(`[${context}] Error:`, error);
    return new Error(error.message || "Error inesperado en UsuarioSocialRepository.");
  }
}

