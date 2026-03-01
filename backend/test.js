import {supabase} from './src/infrastructure/Supabase/supabase.js';

async function testSupabase(){

    console.log('Probando conexión con Supabase...');

    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) {
        console.log('Error al conectar con Supabase:', error);
        return; 
    }
    if (data.length === 0) {
        console.log('Conexión exitosa. sin Datos obtenidos')
    } else {
        console.log('Conexión exitosa. Datos obtenidos:');
        console.table(data);
    }
}

testSupabase();