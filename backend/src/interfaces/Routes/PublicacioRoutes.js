import express from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import PublicacionControllers from "../Controllers/PublicacionControllers.js";

const router = express.Router();

router.post("/crear", AuthMiddleware, (req, res) => PublicacionControllers.CrearPublicacion(req, res));