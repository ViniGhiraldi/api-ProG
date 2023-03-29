import { Knex } from "../../knex";
import { IProjeto } from "../../models";

export const getAll = async (filter = ''): Promise<IProjeto[] | Error> => {
    try {
        const result = await Knex('projeto').select('*').where('titulo', 'like', `%${filter}%`).orWhere('descricao', 'like', `%${filter}%`).orWhere('objetivo', 'like', `%${filter}%`).orWhere('materiais', 'like', `%${filter}%`);

        if(result){
            return result;
        }

        return new Error('Erro ao consultar registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros');
    }
}