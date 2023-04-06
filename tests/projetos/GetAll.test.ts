import { StatusCodes } from "http-status-codes";
import { testServer, token } from "../jest.setup"

describe('Projetos - GetAll',()=>{
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
    it('Tenta consultar registro sem propriedades',async()=>{
        const res = await testServer.get('/projetos').send({}).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
        expect(res.body.length).toEqual(1);
    })
    it('Tenta consultar registro com filtro',async()=>{
        const res = await testServer.get('/projetos').send({
            filter: 'titulo'
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
        expect(res.body.length).toEqual(1);
    })
    it('Tenta consultar registro com user_id',async()=>{
        const res = await testServer.get('/projetos').send({
            user_id: '1'
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
        expect(res.body.length).toEqual(1);
    })
    it('Tenta consultar registro com filtro e user_id',async()=>{
        const res = await testServer.get('/projetos').send({
            filter: 'titulo',
            user_id: '1'
        }).set('authorization', token);

        expect(res.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res.body).toEqual('object');
        expect(res.body.length).toEqual(1);
    })
})