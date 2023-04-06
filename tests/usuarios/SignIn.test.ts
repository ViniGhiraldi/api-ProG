import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Usuarios - SignIn',()=>{
    it('Tenta fazer login sem email',async()=>{
        const res = await testServer.post('/entrar').send({
            senha: '12345'
        })
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["email"]);
    })
    it('Tenta fazer login sem senha',async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'vini@email.com'
        })
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["senha"]);
    })
    it('Tenta fazer login com email inválido',async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'vini email.com',
            senha: '12345'
        })
        expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res.body.issues[0].path).toEqual(["email"]);
    })
    it('Tenta fazer login com email que não existe',async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'teste1@email.com',
            senha: '12345'
        })
        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body.error).toEqual('Email ou senha inválidos');
    })
    it('Tenta fazer login com senha inválida',async()=>{
        const res = await testServer.post('/entrar').send({
            email: 'vini@email.com',
            senha: '123456'
        })
        expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res.body.error).toEqual('Email ou senha inválidos');
    })
})