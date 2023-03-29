import * as yup from 'yup';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';

interface IParamProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema)=>({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0)
    }))
}))

export const getById = async (req: Request<IParamProps>, res: Response) => {
    if(!req.params.id) return;
    console.log(req.params.id);
    res.send(`getById - id: ${req.params.id}`);
}
