import { StatusCodes } from 'http-status-codes';
import { testServer, token } from "../jest.setup"

describe('Usuarios - SignUp',()=>{
    it('Tenta criar registro sem nome',async()=>{
        const res = await testServer.post('/cadastrar').send({
            email: 'teste@email.com',
            senha: '12345'
        });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["nome"])
    })
    it('Tenta criar registro sem email',async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'teste',
            senha: '12345'
        });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["email"])
    })
    it('Tenta criar registro sem senha',async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'teste',
            email: 'teste@email.com'
        });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["senha"])
    })
    it('Tenta criar registro sem nenhuma propriedade',async()=>{
        const res = await testServer.post('/cadastrar').send({});
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues.length).toEqual(3);
    })
    it('Tenta criar registro com nome muito curto',async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'an',
            email: 'teste@email.com',
            senha: '12345'
        });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["nome"])
    })
    it('Tenta criar registro com email inválido',async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'teste',
            email: 'teste email.com',
            senha: '12345'
        });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["email"]);
    })
    it('Tenta criar registro com senha muito curta',async()=>{
        const res = await testServer.post('/cadastrar').send({
            nome: 'teste',
            email: 'teste@email.com',
            senha: '1234'
        });
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["senha"])
    })
})