import { useEffect, useState } from "react";
import { LobbyProps } from "../models/LobbyProps";
import { MessageProps } from "../models/MessageProps";

import "../styling/Lobby.css";
import RoomPopup from "./RoomPopup";

export default function Lobby({ messages, username, socket }: LobbyProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [inputText, setInputText] = useState("");

  const [texts, setTexts] = useState<MessageProps[]>([]);

  useEffect(() => {
    socket.on("message", (message) => {
      const newOtherUserMessage: MessageProps = {
        text: message.text,
        isMyMessage: message.sender === socket.id,
      };
      setTexts((prevTexts) => [...prevTexts, newOtherUserMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleCreateRoom = (newRoom: string) => {
    setRooms([...rooms, newRoom]);

    setCurrentRoom(newRoom);

    setShowPopup(false);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    socket.emit("send_to_user", { text: inputText, sender: socket.id });
    console.log("Det funkar");

    const newText: MessageProps = {
      text: inputText,
      isMyMessage: true,
    };

    setTexts([...texts, newText]);
    console.log("Skickas det till listan");
    setInputText("");
  };

  return (
    <div className="lobby">
      <h1 className="headerLobby">Lobby</h1>
      <div className="chat-container">
        <div className="sidebar">
          <div className="createRoomHeader">
            <button onClick={(e) => setShowPopup(true)} className="lobbyButton">
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

          <ul>
            <button className="lobbyButton">Lobby</button>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
        <div className="chat">
          <div className="messages">
            {texts.map((message, index) => (
              <div
                key={index}
                className={message.isMyMessage ? "my-message" : "other-message"}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="inputBox">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="input"
              type="text"
              placeholder="Skriv ditt meddelande här"
            />
            <button className="inputButton" onClick={sendMessage}>
              Skicka
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
