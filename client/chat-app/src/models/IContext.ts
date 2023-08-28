import io, { Socket } from "socket.io-client";

export interface IContext {
    socket: Socket;


    roomId?: string;
    rooms: object;

}