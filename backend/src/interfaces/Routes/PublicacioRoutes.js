import express from 'express';
import { supabase } from '../../infrastructure/Supabase/supabase.js';
import { AuthMiddleware } from '../middleware/AuthMiddleware.js';
import { OptionalAuthMiddleware } from '../middleware/OptionalAuthMiddleware.js';

// 1. Importamos las CLASES (nombradas con llaves {})
import { PublicacionRepository } from '../../infrastructure/repository/PublicacionRepository.js';
import { Publicacion as PublicacionApp } from '../../application/Publicacion.js';
import { PublicacionControllers } from '../Controllers/PublicacionControllers.js';
import { PublicacionLikeRepository } from '../../infrastructure/repository/PublicacionLikeRepository.js';
import { PublicacionComentarioRepository } from '../../infrastructure/repository/PublicacionComentarioRepository.js';
import { ToggleLikePublicacion } from '../../application/Publicacion/ToggleLike.js';
import { ListarComentariosPublicacion } from '../../application/Publicacion/ListarComentarios.js';
import { CrearComentarioPublicacion } from '../../application/Publicacion/CrearComentario.js';
import { CrearRepostPublicacion } from '../../application/Publicacion/CrearRepost.js';
import { PublicacionInteraccionControllers } from '../Controllers/PublicacionInteraccionControllers.js';

const router = express.Router();

/**
 * INYECCIÓN DE DEPENDENCIAS
 * Siguiendo el flujo: Supabase -> Repository -> UseCase (App) -> Controller
 */

// Instancia de Infraestructura
const repository = new PublicacionRepository(supabase);
const likeRepository = new PublicacionLikeRepository(supabase);
const comentarioRepository = new PublicacionComentarioRepository(supabase);

// Instancia de Aplicación (Caso de Uso)
const publicacionApp = new PublicacionApp(repository);
const toggleLikeUseCase = new ToggleLikePublicacion({ publicacionRepository: repository, likeRepository });
const listarComentariosUseCase = new ListarComentariosPublicacion({ publicacionRepository: repository, comentarioRepository });
const crearComentarioUseCase = new CrearComentarioPublicacion({ publicacionRepository: repository, comentarioRepository });
const crearRepostUseCase = new CrearRepostPublicacion({ publicacionRepository: repository });

// Instancia de Interfaz (Controlador)
const publicacionControllers = new PublicacionControllers(publicacionApp);
const interaccionControllers = new PublicacionInteraccionControllers({
  toggleLikeUseCase,
  listarComentariosUseCase,
  crearComentarioUseCase,
  crearRepostUseCase,
});

/**
 * DEFINICIÓN DE RUTAS
 */

// POST /api/publicaciones - Crear un nuevo post
router.post('/', AuthMiddleware, (req, res) => publicacionControllers.crearPublicacion(req, res));

// GET /api/publicaciones - Obtener el feed
router.get('/', OptionalAuthMiddleware, (req, res) => publicacionControllers.listarPublicaciones(req, res));

// POST /api/publicaciones/:id/like - Toggle like
router.post('/:id/like', AuthMiddleware, (req, res) => interaccionControllers.toggleLike(req, res));

// GET /api/publicaciones/:id/comentarios - Listar comentarios
router.get('/:id/comentarios', (req, res) => interaccionControllers.listarComentarios(req, res));

// POST /api/publicaciones/:id/comentarios - Crear comentario
router.post('/:id/comentarios', AuthMiddleware, (req, res) => interaccionControllers.crearComentario(req, res));

// POST /api/publicaciones/:id/repost - Crear repost (nueva fila en publicacion)
router.post('/:id/repost', AuthMiddleware, (req, res) => interaccionControllers.crearRepost(req, res));

export default router;