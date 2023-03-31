import { Knex } from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('projeto',table => {
        table.bigIncrements('id').primary().index();
        table.string('titulo').checkLength('>',2).notNullable();
        table.string('objetivo').notNullable();
        table.string('descricao');
        table.string('materiais').notNullable();
        table
            .bigInteger('user_id') 
            .index()
            .notNullable()
            .references('id')
            .inTable('usuario')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .then(()=>{
        console.log('# Created table projeto');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTableIfExists('projeto')
    .then(()=>{
        console.log('# Dropped table projeto')
    })
}