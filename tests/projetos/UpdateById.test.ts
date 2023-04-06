import { StatusCodes } from "http-status-codes";
import { testServer, token } from "../jest.setup";

describe('Projetos - UpdateById',()=>{
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
    it('Tenta alterar registro',async()=>{
        const res = await testServer.put('/projetos/1').send({
            titulo: "tituloAlterado",
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);

        const updateVerification = await testServer.get('/projetos/1').send({}).set('authorization',token);
        expect(updateVerification.statusCode).toEqual(StatusCodes.OK);
        expect(updateVerification.body.titulo).toEqual('tituloAlterado');
    })
    it('Tenta alterar registro que não existe',async()=>{
        const res = await testServer.put('/projetos/99999').send({
            titulo: "tituloAlterado2",
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body.error).toEqual('Erro ao alterar registro');
    })
    it('Tenta alterar registro sem a propriedade titulo',async()=>{
        const res = await testServer.put('/projetos/1').send({
            objetivo: "objAlterado",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["titulo"]);
    })
    it('Tenta alterar registro sem a propriedade objetivo',async()=>{
        const res = await testServer.put('/projetos/1').send({
            titulo: "tituloAlterado2",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["objetivo"]);
    })
    it('Tenta alterar registro sem a propriedade materiais',async()=>{
        const res = await testServer.put('/projetos/1').send({
            titulo: "tituloAlterado2",
            objetivo: "objAlterado",
            descricao: "desc 1",
            user_id: "1"
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["materiais"]);
    })
    it('Tenta alterar registro sem a propriedade user_id',async()=>{
        const res = await testServer.put('/projetos/1').send({
            titulo: "tituloAlterado2",
            objetivo: "objAlterado",
            descricao: "desc 1",
            materiais: "materiais 1",
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["user_id"]);
    })
    it('Tenta alterar registro sem a propriedade descricao',async()=>{
        const res = await testServer.put('/projetos/1').send({
            titulo: "tituloAlterado2",
            objetivo: "objAlterado",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);

        const updateVerification = await testServer.get('/projetos/1').send({}).set('authorization',token);
        expect(updateVerification.statusCode).toEqual(StatusCodes.OK);
        expect(updateVerification.body.titulo).toEqual('tituloAlterado2');
    })
    it('Tenta alterar registro sem nenhuma propriedade',async()=>{
        const res = await testServer.put('/projetos/1').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues.length).toEqual(4);
    })
})