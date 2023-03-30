import { Knex } from '../../knex';
import { IUsuario } from './../../models/IUsuario';

export const signUp = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex('usuario').insert(usuario).returning('id');

        if(typeof result === 'object'){
            return result.id;
        }else if(typeof result === 'number'){
            return result;
        }

        return new Error('Erro ao cadastrar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar registro');
    }
}