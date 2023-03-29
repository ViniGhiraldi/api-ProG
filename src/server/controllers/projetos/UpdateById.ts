import * as yup from 'yup';
import { IProjeto } from '../../database/models';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<IProjeto, 'id'> {}

export const updateByIdValidation = validation((getSchema)=>({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0)
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        titulo: yup.string().required().min(3).max(100),
        descricao: yup.string(),
        materiais: yup.string().required(),
        objetivo: yup.string().required()
    }))
}))

export const updateById = async (req: Request<IParamProps,{}, IBodyProps>, res: Response) => {
    console.log(req.params.id, req.body);
    res.send(`updateById - ${req.params.id}`);
}
