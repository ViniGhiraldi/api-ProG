import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {z} from 'zod';
import { ensureAuthenticated } from '../../shared/middleware/EnsureAuthenticated';
import { ProjetosProvider } from '../../database/providers/projetos';

const paramSchema = z.object({
    id: z.number().or(z.string().regex(/^\d+$/).transform(Number)).refine((n) => n>0)
})

const projetoSchema = z.object({
    titulo: z.string().min(3),
    objetivo: z.string(),
    descricao: z.string().optional().default(''),
    materiais: z.string(),
    user_id: z.number().or(z.string().regex(/^\d+$/).transform(Number)).refine((n) => n>0)
})

type Param = z.infer<typeof paramSchema>;
type Projeto = z.infer<typeof projetoSchema>;

export const updateById = async (req:Request<Param,{},Projeto>, res:Response) => {
    const tokenValidation = await ensureAuthenticated(req.headers.authorization)
    if(tokenValidation instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({error: tokenValidation.message});
    }

    const paramValidation = paramSchema.safeParse(req.params);
    const dataValidation = projetoSchema.safeParse(req.body);
    if(!paramValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(paramValidation.error);
    }
    if(!dataValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(dataValidation.error);
    }

    const result = await ProjetosProvider.updateById(req.params.id, req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: result.message
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send('');
}