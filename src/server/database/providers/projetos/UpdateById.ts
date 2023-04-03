import { Knex } from "../../knex";
import { IProjeto } from "../../models/IProjeto";

export const updateById = async (id: number, projeto: Omit<IProjeto, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex('projeto').where('id','=',id).update(projeto);

        if(result){
            return;
        }

        return new Error('Erro ao alterar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao alterar registro');
    }
}