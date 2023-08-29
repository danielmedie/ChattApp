import { useEffect, useState } from "react";

import "../styling/Lobby.css";
import RoomPopup from "./RoomPopup";
import { useUserContext } from "../context/user-context";
import { useSocket } from "../context/socket-context";
import { useRoomContext } from "../context/room-context";

export default function Lobby() {
  const socket = useSocket();
  const { username } = useUserContext();
  const [message, setMessage] = useState("");
  const { room, setRoom, hasJoinedRoom } = useRoomContext();
  const [messagesReceived, setMessagesReceived] = useState<
    { message: string; username: string; time: number }[]
  >([]);
  // State för att hantera popup för att skapa rum
  const [showPopup, setShowPopup] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<
    Array<{ id: string; name: string; username: string }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout: any;
  const [typingMessage, setTypingMessage] = useState("");
  const [lobbyUsers, setUsersLobby] = useState<string[]>([]);

  // Hantera skapandet av nytt rum
  const handleCreateRoom = (newRoom: string) => {
    setRoom(newRoom);
    setShowPopup(false);
  };

  useEffect(() => {
    const receiveMessageHandler = (data: any) => {
      console.log("data" + data);
      if (data.room === room) {
        // Check if the received message belongs to the current room
        setMessagesReceived((prevMessages) => [
          ...prevMessages,
          {
            message: data.message,
            username: data.username,
            time: data.time,
          },
        ]);
      }
    };

    //Detta lägger jag till nu

    const handleActiveRooms = (data: any) => {
      console.log("Data received:", data);
      setCurrentRoom(data);

      if (!data.some((room: any) => room.id === "Lobby")) {
        setCurrentRoom((prevRooms) => [
          ...prevRooms,
          { id: "Lobby", name: "Lobby", username: username },
        ]);
      }
    };

    socket.on("receive_message", receiveMessageHandler);
    socket.on("get_active_rooms", handleActiveRooms);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket, room, username, setRoom]);

  useEffect(() => {
    socket.on("user_connected_message", (username) => {
      setUsersLobby((prevUsers) => [...prevUsers, username]);
      setMessagesReceived((prevMessages: any) => [
        ...prevMessages,

        {
          message: `${username} has joined`,
          username: "System",
          time: Date.now(),
        },
      ]);
    });
  }, [socket]);

  function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  // Hantera stängning av popup för rumsskapande
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const sendMessage = () => {
    if (message !== "") {
      const time = Date.now();
      socket.emit("send_message", { username, room, message, time }); // Include room info
      setMessage("");
    }
  };

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
    socket.emit("user_typing", { username, room, isTyping: true });

    if (e.target.value.trim() !== "") {
      setIsTyping(true);

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isTyping) {
      socket.emit("user_typing", { username, room, isTyping: true });
    } else {
      socket.emit("user_typing", { username, room, isTyping: false });
    }
  }, [isTyping, socket, username, room]);

  useEffect(() => {
    socket.on("typing_indicator", ({ username, isTyping }) => {
      if (isTyping) {
        setTypingMessage(`${username} is typing...`);
      } else {
        setTypingMessage("");
      }
    });
  }, [socket]);

  console.log(currentRoom);
  // Rendera komponenten
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
            <li>
              {" "}
              {hasJoinedRoom ? (
                `Lobby`
              ) : (
                <>{currentRoom.find((r) => r.id === room)?.name || ""}</>
              )}
            </li>
            {lobbyUsers.map((user, i) => (
              <li key={i}> {user} </li>
            ))}
          </ul>
        </div>

        <div className="chat">
          <div className="messages">
            {messagesReceived.map((message, i) => (
              <div key={i}>
                <div
                  className={`chatBox ${
                    message.username === username
                      ? "user-message"
                      : "other-message"
                  }`}
                >
                  <p>{message.username}</p>
                  <p style={{ color: "#000" }}>{message.message}</p>
                </div>
                <span>{formatDateFromTimestamp(message.time)}</span>

                <br />
              </div>
            ))}
          </div>

          <div className="inputBox">
            <div>{typingMessage}</div>
            <input
              value={message}
              onChange={handleInputChange}
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
