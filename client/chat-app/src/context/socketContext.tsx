import { useContext, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { IContext } from "../models/IContext";

const SOCKET_URL = "http://localhost:3000";

const socket = io(SOCKET_URL);

const SocketContext = createContext<IContext>({
    socket,
    rooms: {},
});



function SocketsProvider(props: any) {

    //username ska ligga här med
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState([]);

    //Måste vara en självstängande tagg:
    return <SocketContext.Provider value={{
        socket,
        //username, setUsername,
        rooms, roomId
    }}
        {...props}
    />;
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;


//För att kunna använda utan props- (annan fil)
//const {sockets, roomId} = useSockets();