import * as yup from 'yup';
import { IProjeto } from '../../database/models';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { ProjetosProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IProjeto, 'id'> {}

export const createValidation = validation((getSchema)=>({
    body: getSchema<IBodyProps>(yup.object().shape({
        titulo: yup.string().required().min(3).max(150),
        descricao: yup.string(),
        materiais: yup.string().required(),
        objetivo: yup.string().required()
    }))
}))

export const create = async (req: Request<{},{}, IBodyProps>, res: Response) => {
    const result = await ProjetosProvider.create(req.body);
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).send(result);
}
