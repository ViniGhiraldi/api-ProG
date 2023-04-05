import { StatusCodes } from 'http-status-codes';
import supertest from "supertest";
import { Server } from '../src/server/Server';
import { Knex } from "../src/server/database/knex";

const testServer = supertest(Server)
let token: string = '';

beforeAll(async () => {
    await Knex.migrate.latest()

    const createdUser = await testServer.post('/cadastrar').send({
        nome: 'vinicius',
        email: 'vini@email.com',
        senha: '12345'
    })
    expect(createdUser.statusCode).toEqual(StatusCodes.CREATED);

    const user = await testServer.post('/entrar').send({
        email: 'vini@email.com',
        senha: '12345'
    })
    expect(user.statusCode).toEqual(StatusCodes.OK);

    token = `Bearer ${user.body.accessToken}`;
})

afterAll(async () => {
    await Knex.destroy();
})

export { testServer, token };