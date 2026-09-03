import express from 'express';
import http from 'http';
import ServerConfig from './config/server'
import { Server }  from "socket.io";
import cors from 'cors'

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=> {
    console.log('new user connected')

    socket.on('disconnected', ()=>{
        console.log('user disconnected')
    })
})


const { PORT }  = ServerConfig;

server.listen(PORT, ()=> {
    console.log(`server listening at port: ${PORT}`)
})