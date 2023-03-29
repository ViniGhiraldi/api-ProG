import { server } from "./server/Server";

server.listen(process.env.PORT || 4001, ()=>{
    console.log(`rodando na porta ${process.env.PORT || 4001}`);
})