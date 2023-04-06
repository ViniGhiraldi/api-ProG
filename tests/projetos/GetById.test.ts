import { StatusCodes } from 'http-status-codes';
import {testServer, token} from '../jest.setup';

describe('Projetos - GetById',()=>{
    beforeAll(async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: "titulo 1",
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization', token)
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
    })
    it('Tenta consultar registro',async()=>{
        const res = await testServer.get('/projetos/1').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
        expect([res.body].length).toEqual(1);
    })
    it('Tenta consultar registro que não existe',async()=>{
        const res = await testServer.get('/projetos/99999').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body.error).toEqual('Erro ao consultar registro');
    })
    it('Tenta consultar registro com parametro inválido',async()=>{
        const res = await testServer.get('/projetos/teste').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[1].path).toEqual(["id"]);
        expect(res.body.issues[1].message).toEqual('Invalid input');
    })
})