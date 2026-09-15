import { Socket } from "socket.io";
import {v4 as UUIDv4 } from "uuid"
import type IRoomParams from "../interface/IRoomParams.js"



const rooms: Record<string, string[]> = {}


const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);

        rooms[roomId] = [];

        socket.emit("room-created", { roomId });
        console.log("Room created with id: ", roomId)
    }

    const joinedRoom = ({ roomId, peerId }: IRoomParams)=> {
        console.log("joined room call", rooms, roomId, peerId)
        if(rooms[roomId]){
            console.log("New user joined room", roomId, 'with peer id as', peerId);

            rooms[roomId].push(peerId);
            console.log("added peer to room called", rooms);
             socket.join(roomId);

            socket.emit("get-user", {
                roomId,
                participants: rooms[roomId]
            })
        }
    }

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

export default roomHandler;