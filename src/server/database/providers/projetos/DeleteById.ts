import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex('projeto').where('id', '=', id).del();

        if(result){
            return;
        }

        return new Error('Erro ao deletar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar registro');
    }
}