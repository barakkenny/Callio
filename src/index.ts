import express from 'express';
import http from 'http';
import ServerConfig from './config/server'
import { server } from "socket.io";
import cors from 'cors'

const app = express();

const server = http.createServer(app);

const { PORT }  = ServerConfig;

server.listen(PORT, ()=> {
    console.log(`server listening at port: ${PORT}`)
})