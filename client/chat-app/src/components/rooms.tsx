

//Detta kommer att ligga som en "sidebar" och ska bara visas när användaren
// valt sitt username

import { useEffect, useRef } from "react";
import { useSockets } from "../context/socketContext";
import EVENTS from "../validator/events";


function Rooms() {

    const { socket, roomId, rooms } = useSockets();
    // const createRoomRef = useRef(null);


    // //hantera skapandet av rum

    // //ska detta vara const istället? Isåfall fungerar useEffect
    // function handleCreateRoom() {

    //     // Ett försök att hantera error eftersom useRef är satt till null 

    //     // let _roomname = "";
    //     // if (createRoom.current === null) {
    //     //     _roomname = "";
    //     // } else {
    //     //     _roomname = createRoom.current.value;
    //     // }

    //     // const roomName = _roomname;


    //     //hämta namnet på rum (error pga värdet är null)
    //     // useEffect(() => {
    //     const roomName = createRoomRef.current.value;

    //     if (!String(roomName).trim()) return;

    //     // })

    //     //emitta skapat rum (event)
    //     socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    //     //inputtaggen som tom string
    //     createRoomRef.current.value = "";

    // }



    const roomSetup = () => {

        //map. meddelande-komponent

    }
    return (
        <div>
            <section className="room-container">
                <input ref={createRoomRef} placeholder=" Call your room something... " />
                <button onClick={handleCreateRoom}>Create your room!</button>
                <p> Du kallar ditt rum för {createRoomRef.current}</p>


            </section>
        </div>
    )
}

export default Rooms;