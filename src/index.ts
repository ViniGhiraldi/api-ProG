import { Server } from "./server/Server";

Server.listen(process.env.PORT || 3001,()=>{
    console.log(`rodando na porta ${process.env.PORT || 3001}`);
})