import express from "express";
import {supabase} from '../../infrastructure/Supabase/supabase.js'
import { RegistroUsuario } from "../../application/Auth/RegistroUsuario.js";
import { LoginUsuario } from "../../application/Auth/LoginUsuario.js";
import { AuthControllers } from "../Controllers/authControllers.js";
import { SupabaseUsuarioRepository } from "../../infrastructure/repository/SupabaseUsuarioRepository.js";
import { ResetPasswordUsuario } from "../../application/Auth/ResetPasswordUsuario.js";

const router = express.Router();


const repository = new SupabaseUsuarioRepository(supabase);
const registroUsuario = new RegistroUsuario(repository);
const loginUsuario = new LoginUsuario(repository);
const resetPasswordUsuario = new ResetPasswordUsuario(repository);
const authControllers = new AuthControllers(registroUsuario, loginUsuario,resetPasswordUsuario);

router.post("/registro", (req, res) => authControllers.Registro(req, res));
router.post("/login", (req, res) => authControllers.Login(req, res));
router.post("/reset-password", (req,res) => authControllers.RequestReset(req,res));
router.post("/complete-reset", (req, res) => authControllers.CompleteReset(req, res)); 

export default router;
