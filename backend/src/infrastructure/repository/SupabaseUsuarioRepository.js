import { supabase } from "../Supabase/supabase.js";

export class SupabaseUsuarioRepository {
    async registrarUsuario(usuario) {
        const {data,error} = await supabase 
        .from('usuarios') 
        .insert([
            {
                Nombre: usuario.Nombre,
                Telefono: usuario.Telefono,
                FechaNacimiento: usuario.FechaNacimiento,
                Email: usuario.Email,
                Contraseña: usuario.Contraseña
            }
        ])
        .select().single();

        if(error){
            if(error.code === '23505'){
                throw new Error('El correo ya está registrado');
            }
             throw new Error(error.message);
        }
        return data;
    }
    
    async findByEmail(email){
        const {data,error} = await supabase 
        .from('usuarios') 
        .select('*')
        .eq('Email', email)
        .single();

        if(error && error.code !== 'PGRST116'){
            throw new Error(error.message);
        }
        return data;
    }
        
}