import { StatusCodes } from 'http-status-codes';
import { testServer, token } from "../jest.setup"

describe('Projetos - Create',()=>{
    it('Tenta criar registro sem token de acesso',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: "titulo 1",
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        })
        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body.error).toEqual('não autenticado');
    })
    it('Tenta criar registro',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: "titulo 1",
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    })
    it('Tenta criar registro sem titulo',async()=>{
        const res = await testServer.post('/projetos').send({
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["titulo"]);
    })
    it('Tenta criar registro sem objetivo',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: 'titulo 1',
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["objetivo"]);
    })
    it('Tenta criar registro sem materiais',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: 'titulo 1',
            objetivo: "obj 1",
            descricao: "desc 1",
            user_id: "1"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["materiais"]);
    })
    it('Tenta criar registro sem user_id',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: 'titulo 1',
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["user_id"]);
    })
    it('Tenta criar registro sem descricao',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: 'titulo 1',
            objetivo: "obj 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res.body).toEqual('number');
    })
    it('Tenta criar registro atrelado a usuario não existente',async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: 'titulo 1',
            objetivo: "obj 1",
            descricao: 'desc 1',
            materiais: "materiais 1",
            user_id: "99999"
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body.error).toEqual('Erro ao cadastrar registro');
    })
    it('Tenta criar registro sem propriedades',async()=>{
        const res = await testServer.post('/projetos').send({}).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues.length).toEqual(4)
    })
    
})