import express from "express";
import { supabase } from "../../infrastructure/Supabase/supabase.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";
import { OptionalAuthMiddleware } from "../middleware/OptionalAuthMiddleware.js";

import { UsuarioSocialRepository } from "../../infrastructure/repository/UsuarioSocialRepository.js";
import { GetPerfilPublico } from "../../application/Usuario/GetPerfilPublico.js";
import { UpdatePerfil } from "../../application/Usuario/UpdatePerfil.js";
import { ToggleFollow } from "../../application/Usuario/ToggleFollow.js";
import { ListFollowers } from "../../application/Usuario/ListFollowers.js";
import { ListFollowing } from "../../application/Usuario/ListFollowing.js";
import { UsuariosControllers } from "../Controllers/UsuariosControllers.js";

const router = express.Router();

// Repository
const usuarioSocialRepository = new UsuarioSocialRepository(supabase);

// UseCases
const getPerfilPublico = new GetPerfilPublico(usuarioSocialRepository);
const updatePerfil = new UpdatePerfil(usuarioSocialRepository);
const toggleFollow = new ToggleFollow(usuarioSocialRepository);
const listFollowers = new ListFollowers(usuarioSocialRepository);
const listFollowing = new ListFollowing(usuarioSocialRepository);

// Controller
const usuariosControllers = new UsuariosControllers({
  usuarioSocialRepository,
  getPerfilPublico,
  updatePerfil,
  toggleFollow,
  listFollowers,
  listFollowing,
});

// ==========================
// RUTAS
// ==========================

// Mi perfil
router.get("/me", AuthMiddleware, usuariosControllers.getMe);
router.patch("/me", AuthMiddleware, usuariosControllers.patchMe);

// Perfil público
router.get("/:id", OptionalAuthMiddleware, usuariosControllers.getPerfil);

// Follow
router.post("/:id/follow", AuthMiddleware, usuariosControllers.toggleFollow);
router.get("/:id/followers", usuariosControllers.listFollowers);
router.get("/:id/following", usuariosControllers.listFollowing);

export default router;