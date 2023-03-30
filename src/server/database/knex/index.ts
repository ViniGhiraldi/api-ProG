import 'dotenv/config';
import { knex } from 'knex';
import { development, production, test } from './Environment';

const Knex = knex;

switch (process.env.NODE_ENV) {
    case 'prod':
        Knex(production);
        break;

    case 'test':
        Knex(test);
        break;

    default:
        Knex(development);
}

export { Knex }