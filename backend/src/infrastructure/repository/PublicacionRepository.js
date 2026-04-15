import { supabase as defaultClient } from "../Supabase/supabase.js";

const PUBLICACION_FEED_SELECT = `
    *,
    usuarios(id, Nombre, avatar_url),
    original_publicacion:publicacion!id_publicacion_original(
      id,
      contenido,
      created_at,
      imagen_url,
      id_usuario,
      usuarios(id, Nombre, avatar_url)
    )
  `;

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
            .select(PUBLICACION_FEED_SELECT)
            .single();

        if (error) throw this._handleError(error, "CrearPublicacion");
        return data;
    }

    async crearRepost({ id_usuario, id_publicacion_original, contenido = "" }) {
        const { data, error } = await this.supabase
            .from('publicacion')
            .insert([{
                id_usuario,
                contenido,
                id_publicacion_original,
            }])
            .select(PUBLICACION_FEED_SELECT)
            .single();

        if (error) throw this._handleError(error, "CrearRepost");
        return data;
    }

    async obtenerTodas() {
        const { data, error } = await this.supabase
            .from('publicacion')
            .select(PUBLICACION_FEED_SELECT)
            .order('created_at', { ascending: false });

        if (error) throw this._handleError(error, "ObtenerPublicaciones");
        return data;
    }

    async obtenerTodasEnriquecidas(idUsuario = null) {
        const { data, error } = await this.supabase
            .from('publicacion')
            .select(PUBLICACION_FEED_SELECT)
            .order('created_at', { ascending: false });

        if (error) throw this._handleError(error, "ObtenerPublicacionesEnriquecidas");
        const posts = data || [];

        const rootCache = new Map();
        const rootOf = async (id) => {
            if (rootCache.has(id)) return rootCache.get(id);
            const root = await this.obtenerIdRaiz(id);
            rootCache.set(id, root);
            return root;
        };

        for (const p of posts) {
            await rootOf(p.id);
        }

        const rootsArr = [...new Set(posts.map((p) => rootCache.get(p.id)))];

        let likedRoots = new Set();
        if (idUsuario && rootsArr.length > 0) {
            const { data: likes, error: likesError } = await this.supabase
                .from("publicacion_like")
                .select("publicacion_id")
                .eq("id_usuario", idUsuario)
                .in("publicacion_id", rootsArr);

            if (likesError) throw this._handleError(likesError, "LikesFeed");
            likedRoots = new Set((likes || []).map((l) => l.publicacion_id));
        }

        return posts.map((p) => {
            const raiz = rootCache.get(p.id);
            return {
                ...p,
                id_publicacion_raiz: raiz,
                liked_by_me: idUsuario ? likedRoots.has(raiz) : false,
            };
        });
    }

    async obtenerPorIdBasico(id_publicacion) {
        const { data, error } = await this.supabase
            .from('publicacion')
            .select('id, id_publicacion_original, likes_count, comentarios_count, reposts_count')
            .eq('id', id_publicacion)
            .single();

        if (error) throw this._handleError(error, "ObtenerPublicacionBasico");
        return data;
    }

    async obtenerIdRaiz(id_publicacion) {
        // Resuelve la raíz siguiendo id_publicacion_original (máx. 10 saltos)
        let actual = await this.obtenerPorIdBasico(id_publicacion);
        let depth = 0;

        while (actual?.id_publicacion_original && depth < 10) {
            actual = await this.obtenerPorIdBasico(actual.id_publicacion_original);
            depth += 1;
        }

        return actual?.id || id_publicacion;
    }

    async _getCounter(id_publicacion, counterField) {
        const { data, error } = await this.supabase
            .from('publicacion')
            .select(`${counterField}`)
            .eq('id', id_publicacion)
            .single();

        if (error) throw this._handleError(error, `GetCounter:${counterField}`);
        return data?.[counterField] ?? 0;
    }

    async incrementarContador(id_publicacion, counterField, delta) {
        const actual = await this._getCounter(id_publicacion, counterField);
        const nuevo = Math.max(0, (actual ?? 0) + delta);

        const { data, error } = await this.supabase
            .from('publicacion')
            .update({ [counterField]: nuevo })
            .eq('id', id_publicacion)
            .select(`${counterField}`)
            .single();

        if (error) throw this._handleError(error, `UpdateCounter:${counterField}`);
        return data?.[counterField] ?? nuevo;
    }

    // Método privado para manejar errores de forma centralizada
    _handleError(error, context) {
        console.error(`[${context}] Error:`, error);
        return new Error(error.message || "Error inesperado en el repositorio de publicaciones.");
    }
}