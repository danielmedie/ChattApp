import { useContext } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

const socket = io(SOCKET_URL);

const SocketContext = createContext({ socket });

function SocketsProvider(props: any) {

    //Kan också vara en självstängande tagg :
    return <SocketContext.Provider value={{ socket }}> {...props} </SocketContext.Provider>;
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;


//För att kunna använda utan props- (annan fil)
//const {sockets, roomId} = useSockets();