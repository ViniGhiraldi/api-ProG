import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {z} from 'zod';

const userSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(5)
})

type User = z.infer<typeof userSchema>

export const signIn = async (req:Request<{},{},User>, res:Response) => {
    const result = userSchema.safeParse(req.body)

    if(result.success){
        return res.status(StatusCodes.OK).json(result.data)
    }

    return res.status(StatusCodes.BAD_REQUEST).json(result.error)
}