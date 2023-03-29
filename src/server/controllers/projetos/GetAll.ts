import * as yup from 'yup';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';

interface IQueryProps{
    filter?: string;
}

export const getAllValidation = validation((getSchema)=>({
    query: getSchema<IQueryProps>(yup.object().shape({
        filter: yup.string()
    }))
}))

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {
    console.log(req.query.filter);
    res.send('getAll');
}
