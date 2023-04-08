import express from 'express';
import cors from 'cors';
import { router } from './routes';
import 'dotenv/config';

const Server = express();

Server.use(cors({
    origin: 'https://www.google.com'
}))

Server.use(express.json());
Server.use(router);


export { Server };