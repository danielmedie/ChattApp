import { useState } from "react";
import { LobbyProps } from "../models/LobbyProps";
import "../styling/Lobby.css";
import RoomPopup from "./RoomPopup";

export default function Lobby({ messages, username, socket }: LobbyProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");

  const handleCreateRoom = (newRoom: string) => {
    setRooms([...rooms, newRoom]);

    setCurrentRoom(newRoom);

    setShowPopup(false);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="lobby">
      <div className="chatContainer">
        <h1 className="headerLobby">Lobby</h1>

        <hr />
        <div className="inputContainer">
          <div className="sideBar">
            <div className="createRoomHeader">
              <button
                onClick={(e) => setShowPopup(true)}
                className="lobbyButton"
              >
                Create room
              </button>
              {showPopup && (
                <RoomPopup
                  onClose={handleClosePopup}
                  onCreate={handleCreateRoom}
                />
              )}
              <button className="lobbyButton">Log out</button>
            </div>
            <h2>Rooms:</h2>
            <ul>
              {rooms.map((room, index) => (
                <button
                  key={index}
                  className="lobbyButton"
                  onClick={() => setCurrentRoom(room)}
                >
                  {room}
                </button>
              ))}
            </ul>

            <h2>Messages:</h2>
            <ul>
              <button className="lobbyButton">Lobby</button>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
          <div className="inputBox">
            <input
              className="input"
              type="text"
              placeholder="Skriv ditt meddelande här"
            />
            <button className="inputButton">Skicka</button>
          </div>
        </div>
      </div>
    </div>
  );
}
