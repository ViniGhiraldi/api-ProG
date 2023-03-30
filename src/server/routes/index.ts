import { Router } from "express";
import { UsuariosController } from "../controllers";

const router = Router();


router.post('/cadastrar', UsuariosController.signUp);

export {router};