import { Knex } from "../../knex";
import { IProjeto } from "../../models/IProjeto";

export const getAll = async (filter = '', user_id = 0): Promise<IProjeto[] | Error> => {
    try {
        let result: IProjeto[] | undefined = undefined;
        if(filter){
            result = await Knex('projeto')
            .select('*')
            .where('titulo','like',`%${filter}%`)
            .orWhere('descricao','like',`%${filter}%`)
            .orWhere('objetivo','like',`%${filter}%`)
            .orWhere('materiais','like',`%${filter}%`);
        }else if(user_id){
            result = await Knex('projeto').select('*').where('user_id','=',user_id);
        }else{
            result = await Knex('projeto').select('*');
        }

        if(result){
            return result;
        }

        return new Error('Erro ao consultar registros');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros');
    }
}