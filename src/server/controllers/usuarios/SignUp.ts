import { z } from 'zod';
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { UsuariosProvider } from '../../database/providers';

const userSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(5)
})

type User = z.infer<typeof userSchema>

export const signUp = async (req:Request<{},{},User>, res:Response) => {
    const dataValidation = userSchema.safeParse(req.body);

    if(!dataValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(dataValidation.error);
    }

    const result = await UsuariosProvider.signUp(dataValidation.data);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: result.message
        })
    }
    
    return res.status(StatusCodes.CREATED).json(result);
}