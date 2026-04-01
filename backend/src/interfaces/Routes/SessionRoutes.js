import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { SessionControllers } from "../Controllers/SessionControllers.js";
import { GetCurrentUser } from "../../application/Session/GetCurrentUser.js"; // Clase en Mayúscula
import { SupabaseUsuarioRepository } from "../../infrastructure/repository/SupabaseUsuarioRepository.js";
import { SessionRepository } from "../../infrastructure/repository/SessionRepository.js";
import { Logout } from "../../application/Session/Logout.js";
import { RefreshToken } from "../../application/Session/RefreshToken.js";
import express from "express";

const router = express.Router();

// 1. Instancias de Repositorios
const sessionRepository = new SessionRepository();
const userRepository = new SupabaseUsuarioRepository();

// 2. Instancias de Use Cases
const logoutUseCase = new Logout(sessionRepository);
const refreshTokenUseCase = new RefreshToken(sessionRepository);
const getCurrentUserUseCase = new GetCurrentUser(userRepository); // Pasamos el de usuario para el perfil

// 3. Instancia del Controlador
const sessionController = new SessionControllers(
    getCurrentUserUseCase, 
    logoutUseCase, 
    refreshTokenUseCase
);

// --- DEFINICIÓN DE RUTAS ---

// Obtener info del usuario (Requiere estar logueado)
router.get("/me", AuthMiddleware, (req, res) => sessionController.getCurrentUser(req, res));

// Cerrar sesión (Requiere estar logueado para saber qué sesión cerrar)
router.post("/logout", AuthMiddleware, (req, res) => sessionController.logout(req, res));

// Refrescar token (OJO: A veces no lleva AuthMiddleware o lleva uno especial para Refresh Cookies)
router.post("/refresh", (req, res) => sessionController.refreshToken(req, res));

export default router;