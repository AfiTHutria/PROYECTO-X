import express from 'express';
import { supabase } from '../../infrastructure/Supabase/supabase.js';

// 1. Importamos las CLASES (nombradas con llaves {})
import { PublicacionRepository } from '../../infrastructure/repository/PublicacionRepository.js';
import { Publicacion as PublicacionApp } from '../../application/Publicacion.js';
import { PublicacionControllers } from '../Controllers/PublicacionControllers.js';

const router = express.Router();

/**
 * INYECCIÓN DE DEPENDENCIAS
 * Siguiendo el flujo: Supabase -> Repository -> UseCase (App) -> Controller
 */

// Instancia de Infraestructura
const repository = new PublicacionRepository(supabase);

// Instancia de Aplicación (Caso de Uso)
const publicacionApp = new PublicacionApp(repository);

// Instancia de Interfaz (Controlador)
const publicacionControllers = new PublicacionControllers(publicacionApp);

/**
 * DEFINICIÓN DE RUTAS
 */

// POST /api/publicaciones - Crear un nuevo post
router.post('/', (req, res) => publicacionControllers.crearPublicacion(req, res));

// GET /api/publicaciones - Obtener el feed
router.get('/', (req, res) => publicacionControllers.listarPublicaciones(req, res));

export default router;