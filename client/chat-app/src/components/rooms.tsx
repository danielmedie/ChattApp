

//Detta kommer att ligga som en "sidebar" och ska bara visas när användaren
// valt sitt username

import { useRef } from "react";
import { useSockets } from "../context/socketContext";


function Rooms() {

    const { socket, roomId, rooms } = useSockets();
    const createRoom = useRef(null);


    //hantera skapandet av rum

    function handleCreateRoom() {

        //hämta namnet på rum

        //emitta skapat rum

        //inputtaggen som tom string

    }



    const roomSetup = () => {
        <section className="room-container">
            <input ref={createRoom} placeholder=" Call your room something... " />
            <button onClick={handleCreateRoom}>Create your room!</button>
        </section>
        //map. meddelande-komponent


        // <section>
        //     <p>
        //     </p>
        // </section>
    }
    return (
        <div>
            <Rooms />
        </div>
    )
}

export default Rooms;