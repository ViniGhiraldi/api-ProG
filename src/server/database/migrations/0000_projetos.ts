import { Knex } from "knex";


export async function up(knex: Knex){
    return knex.schema.createTable('projeto', table => {
        table.bigIncrements('id').primary().index();
        table.string('titulo', 150).checkLength('<', 151).index().notNullable();
        table.string('descricao').index();
        table.string('materiais').index().notNullable();
        table.string('objetivo').index().notNullable();
    })
    .then(()=>{
        console.log(`# Created table projeto`)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('projeto')
    .then(()=>{
        console.log(`# Dropped table projeto`)
    })
}