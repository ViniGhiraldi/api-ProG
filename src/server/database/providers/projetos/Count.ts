import { Knex } from "../../knex"

export const count = async (filter=''): Promise<number | Error> => {
    try {
        const [{count}] = await Knex('projeto').where('titulo', 'like', `%${filter}%`).orWhere('descricao', 'like', `%${filter}%`).orWhere('objetivo', 'like', `%${filter}%`).orWhere('materiais', 'like', `%${filter}%`).count<[{count: number}]>('* as count') ;

        if(Number(count)) return Number(count);

        return new Error('Erro ao consultar a quantidade total de registros')
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar a quantidade total de registros')
    }
}