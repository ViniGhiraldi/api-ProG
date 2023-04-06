import { StatusCodes } from "http-status-codes";
import { testServer, token } from "../jest.setup";

describe('Projetos - DeleteById',()=>{
    beforeAll(async()=>{
        const res = await testServer.post('/projetos').send({
            titulo: "titulo 1",
            objetivo: "obj 1",
            descricao: "desc 1",
            materiais: "materiais 1",
            user_id: "1"
        }).set('authorization', token)
        expect(res.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post('/projetos').send({
            titulo: "titulo 2",
            objetivo: "obj 2",
            descricao: "desc 2",
            materiais: "materiais 2",
            user_id: "1"
        }).set('authorization', token)
        expect(res2.statusCode).toEqual(StatusCodes.CREATED);
    })
    it('Tenta deletar registro',async()=>{
        const res = await testServer.delete('/projetos/1').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);

        const deleteVerification = await testServer.get('/projetos/1').send({}).set('authorization',token);
        expect(deleteVerification.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(deleteVerification.body.error).toEqual('Erro ao consultar registro')
    })
    it('Tenta deletar registro que não existe',async()=>{
        const res = await testServer.delete('/projetos/99999').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body.error).toEqual('Erro ao deletar registro');
    })
    it('Tenta deletar registro com parametro inválido',async()=>{
        const res = await testServer.delete('/projetos/teste').send({}).set('authorization',token);

        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["id"]);
    })
})