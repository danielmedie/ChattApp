import { Socket } from "socket.io-client";

export interface LobbyProps {
  messages: string[];
  username: string;
  socket: Socket;
}
