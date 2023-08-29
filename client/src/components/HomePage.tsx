import { useRoomContext } from "../context/room-context";
import { useSocket } from "../context/socket-context";
import { useUserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { username, setUsername } = useUserContext();
  const { setRoom, setHasJoinedRoom } = useRoomContext();

  const socket = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (username !== "") {
      setRoom("Lobby");
      setHasJoinedRoom(true);
      socket.emit("join_room", { username, room: "Lobby" });
    }

    navigate("/chat", { replace: true });
  };

  return (
    <div className="homePage">
      <div className="homeContainer">
        <h1 className="headerHome">Chatt App</h1>

        <div className="inputContainer">
          <input
            className="inputHomePage"
            placeholder="Skriv ditt användarnamn"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
          />
          <button onClick={handleJoinRoom} className="inputBtn">
            Börja chatta
          </button>
        </div>
      </div>
    </div>
  );
}
