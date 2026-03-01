import express from "express";
import { RegistroUsuario } from "../../application/RegistroUsuario.js";
import { LoginUsuario } from "../../application/LoginUsuario.js";
import { AuthControllers } from "../Controllers/authControllers.js";
import { SupabaseUsuarioRepository } from "../../infrastructure/repository/SupabaseUsuarioRepository.js";

const router = express.Router();

const repository = new SupabaseUsuarioRepository();
const registroUsuario = new RegistroUsuario(repository);
const loginUsuario = new LoginUsuario(repository);
const authControllers = new AuthControllers(registroUsuario, loginUsuario);

router.post("/registro", (req, res) => authControllers.Registro(req, res));
router.post("/login", (req, res) => authControllers.Login(req, res));

export default router;
