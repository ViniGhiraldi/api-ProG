import { IUsuario } from "../../models/IUsuario";

declare module 'knex/types/tables'{
    interface Tables{
        usuario: IUsuario,
        //projeto: IProjeto
    }
}