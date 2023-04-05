import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup"

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
        expect(res.body).toHaveProperty('error');
    })
})