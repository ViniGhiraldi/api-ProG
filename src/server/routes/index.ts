import { Router } from "express";
import { UsuariosController, ProjetosController } from "../controllers";
import { ensureAuthenticated } from "../shared/middleware/EnsureAuthenticated";

const router = Router();


router.post('/cadastrar', UsuariosController.signUp);
router.post('/entrar', UsuariosController.signIn);

router.post('/projetos', ProjetosController.create);
router.get('/projetos/:id', ProjetosController.getById);
router.get('/projetos', ProjetosController.getAll);
router.put('/projetos/:id', ProjetosController.updateById);
router.delete('/projetos/:id', ProjetosController.deleteById);

export {router};