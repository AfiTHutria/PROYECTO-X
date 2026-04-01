import { supabase as defaultClient } from "../Supabase/supabase.js";

export class SessionRepository {
    constructor(supabaseClient) {
        this.supabase = supabaseClient || defaultClient;
        if (!this.supabase) {
            throw new Error(" No se pudo inicializar Supabase. Verifica la ruta de importación.");
        }
    }
    async findByToken(token) {
            const {data,error} = await this.supabase.auth.getUser(token);

            if(error||!data) return null;
            return data.user;
    }
    async deleteSession(){
            const { error } = await this.supabase.auth.signOut();
            if(error) throw new Error("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
            return true;
    }
    async refresehSession(refreshToken){
        const { data, error } = await this.supabase.auth.refreshSession({
            refresh_token: refreshToken
        });
        if(error) return null;
        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            user: data.user
        };
    }
}