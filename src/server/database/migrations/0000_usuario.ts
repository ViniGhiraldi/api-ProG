import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('usuario', table => {
        table.bigIncrements('id').primary().index(),
        table.string('nome').checkLength('>', 2).notNullable(),
        table.string('email').unique().index().notNullable(),
        table.string('senha').checkLength('>', 4).notNullable()
    })
    .then(()=>{
        console.log('# Created table usuario');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('usuario')
    .then(()=>{
        console.log('# Dropped table usuario');
    })
}

