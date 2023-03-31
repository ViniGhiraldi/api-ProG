import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {z} from 'zod';
import { ensureAuthenticated } from '../../shared/middleware/EnsureAuthenticated';

const projetoSchema = z.object({
    id: z.number().or(z.string().regex(/^\d+$/).transform(Number)).refine((n) => n>0)
})

type Projeto = z.infer<typeof projetoSchema>

export const deleteById = async (req:Request<Projeto>, res:Response) => {
    const tokenValidation = await ensureAuthenticated(req.headers.authorization)
    if(tokenValidation instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({error: tokenValidation.message});
    }

    const dataValidation = projetoSchema.safeParse(req.params);
    if(!dataValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(dataValidation.error);
    }

    return res.status(StatusCodes.CREATED).json(dataValidation.data);
}