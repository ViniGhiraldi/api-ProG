import { Router } from "express";
import { UsuariosController } from "../controllers";

const router = Router();


router.post('/cadastrar', UsuariosController.signUp);
router.post('/entrar', UsuariosController.signIn)

export {router};