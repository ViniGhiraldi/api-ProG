import { Knex } from "../../knex"
import { IUsuario } from "../../models/IUsuario";

export const signIn = async (email: string): Promise<IUsuario | Error> => {
    try {
        const result = await Knex('usuario').select('*').where('email', '=', email).first();

        if(!result) return new Error('Email ou senha inválidos');

        return result;
    } catch (error) {
        console.log(error);
        return new Error('Email ou senha inválidos');
    }
}