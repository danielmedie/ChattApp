import { useContext, useState, createContext, PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const socket = io(SOCKET_URL);

interface ISocketContext {
    room: string
}

const defaultValue = {
    room: "",

}

const SocketContext = createContext<ISocketContext>(defaultValue);


export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {

    // username, logged in osv ovanför rums-statet
    const [room, setRoom] = useState("");

    useEffect(() => {

        socket.emit("join_room", room);
    }, [room])


    //Måste vara en självstängande tagg:
    return <SocketContext.Provider value={{ room }}>;
        {children}
    </SocketContext.Provider>

}

export default SocketProvider;
