import { Server } from "./server/Server";
import { Knex } from "./server/database/knex";

const startServer = () => {
    Server.listen(process.env.PORT || 3333, () => {
        console.log(`rodando na porta ${process.env.PORT || 3333}`);
    });
}

if(!process.env.IS_LOCALHOST){
    Knex.migrate.latest().then(()=>{
        startServer();
    }).catch(console.log);
}else{
    startServer();
}