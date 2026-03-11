import { supabase } from "../Supabase/supabase.js";

export class SupabaseUsuarioRepository {

    // Aplicacion de caso de uso de RegistroUsuario para registrar parametros en base de Datos
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
        .select()

        if(error){
            if(error.code === '23505'){
                throw new Error('El correo ya está registrado');
            }
             throw new Error(error.message);
        }
        return data;
    }
    
    // Verificacion de email y constraseña con respecto el caso de uso Login usuario 

    async Login(usuario){
        const {data,error} =await supabase

        .from('usuarios')
        .select('*')
        .eq('Email', usuario.Email)
        .eq('Contraseña', usuario.Contraseña)
        .single();

        if(error && error.code !== 'PGRST116'){
            throw new Error (error.message);
        }

        if(!data){
            throw new Error("El correo o la contraseña son incorrectos");
        }
        return data
    }
    
    
}