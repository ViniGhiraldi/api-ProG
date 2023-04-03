import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {number, transformer, z} from 'zod';
import { ensureAuthenticated } from '../../shared/middleware/EnsureAuthenticated';
import { ProjetosProvider } from '../../database/providers/projetos';

const projetoSchema = z.object({
    titulo: z.string().min(3),
    objetivo: z.string(),
    descricao: z.string().optional().default(''),
    materiais: z.string(),
    user_id: z.number().or(z.string().regex(/^\d+$/).transform(Number)).refine((n) => n>0)
})

type Projeto = z.infer<typeof projetoSchema>

export const create = async (req:Request<{},{},Projeto>, res:Response) => {
    const tokenValidation = await ensureAuthenticated(req.headers.authorization)
    if(tokenValidation instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({error: tokenValidation.message});
    }

    const dataValidation = projetoSchema.safeParse(req.body);
    if(!dataValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(dataValidation.error);
    }

    const result = await ProjetosProvider.create(req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: result.message
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
}