

//Detta kommer att ligga som en "sidebar" och ska bara visas när användaren
// valt sitt username

import { useSocket } from "../context/socketContext";



function Rooms() {

    const { room } = useSocket();

    const roomSetup = () => {

        //map. meddelande-komponent

    }
    return (
        <div>
            <section className="room-container">

            </section>
        </div>
    )
}

export default Rooms;