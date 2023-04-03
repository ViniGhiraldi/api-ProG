import { Knex } from "../../knex";
import { IProjeto } from "../../models/IProjeto";

export const create = async (projeto: Omit<IProjeto, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex('projeto').insert(projeto).returning('id');

        if(typeof result === 'object'){
            return result.id;
        }

        return new Error('Erro ao cadastrar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar registro');
    }
}