import { Router } from "express";
import { ProjetosController } from '../controllers';

const router = Router();

router.get('/projetos/:id', ProjetosController.getByIdValidation, ProjetosController.getById);
router.get('/projetos', ProjetosController.getAllValidation, ProjetosController.getAll);
router.post('/projetos', ProjetosController.createValidation, ProjetosController.create);
router.put('/projetos/:id', ProjetosController.updateByIdValidation, ProjetosController.updateById);
router.delete('/projetos/:id', ProjetosController.deleteByIdValidation, ProjetosController.deleteById);

export { router };