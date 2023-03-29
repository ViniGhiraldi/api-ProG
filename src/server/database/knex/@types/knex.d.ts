import { IProjeto } from "../../models";

declare module 'knex/types/tables'{
    interface Tables{
        projeto: IProjeto
    }
}