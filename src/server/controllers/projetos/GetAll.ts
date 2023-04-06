import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {z} from 'zod';
import { ensureAuthenticated } from '../../shared/middleware/EnsureAuthenticated';
import { ProjetosProvider } from '../../database/providers/projetos';

const projetoSchema = z.object({
    filter: z.string().optional(),
    user_id: z.number().or(z.string().regex(/^\d+$/).transform(Number)).refine((n) => n>0).optional()
})

type Projeto = z.infer<typeof projetoSchema>

export const getAll = async (req:Request<{},{},{},Projeto>, res:Response) => {
    const tokenValidation = await ensureAuthenticated(req.headers.authorization)
    if(tokenValidation instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({error: tokenValidation.message});
    }

    const dataValidation = projetoSchema.safeParse(req.query);
    if(!dataValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(dataValidation.error);
    }

    const result = await ProjetosProvider.getAll(req.query.filter, req.query.user_id);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: result.message
        });
    }
    console.log(result)

    return res.status(StatusCodes.OK).json(result);
}