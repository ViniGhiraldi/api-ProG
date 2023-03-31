import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {z} from 'zod';
import { ensureAuthenticated } from '../../shared/middleware/EnsureAuthenticated';

const paramSchema = z.object({
    id: z.number().positive().int()
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

    return res.status(StatusCodes.CREATED).json({
        id: paramValidation.data,
        data: dataValidation.data
    });
}