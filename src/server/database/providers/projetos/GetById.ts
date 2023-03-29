import { Knex } from "../../knex";
import { IProjeto } from "../../models";

export const getById = async (id: number): Promise<IProjeto | Error> => {
    try {
        const result = await Knex('projeto').select('*').where('id', '=', id).first();

        if(result){
            return result;
        }

        return new Error('Erro ao consultar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro');
    }
}