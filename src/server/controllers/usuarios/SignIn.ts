import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {z} from 'zod';
import { UsuariosProvider } from '../../database/providers';
import { sign } from '../../shared/services/JWTService';
import { verifyPassword } from '../../shared/services/PasswordCrypto';

const userSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(5)
})

type User = z.infer<typeof userSchema>

export const signIn = async (req:Request<{},{},User>, res:Response) => {
    const dataValidation = userSchema.safeParse(req.body)

    if(!dataValidation.success){
        return res.status(StatusCodes.BAD_REQUEST).json(dataValidation.error)
    }

    const result = await UsuariosProvider.signIn(dataValidation.data.email);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: result.message
        })
    }

    const passwordValidation = await verifyPassword(dataValidation.data.senha, result.senha);

    if(!passwordValidation){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Email ou senha inválidos'
        })
    }

    const accessToken = sign({uid: result.id})
    if(accessToken === 'JWT_SECRET_NOT_FOUND') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'JWT_SECRET_NOT_FOUND'
    })

    return res.status(StatusCodes.OK).json({accessToken})
}