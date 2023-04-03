import { IUsuario, IProjeto } from "../../models";

declare module 'knex/types/tables'{
    interface Tables{
        usuario: IUsuario,
        projeto: IProjeto
    }
}