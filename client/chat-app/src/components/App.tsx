import React, { useEffect, useState } from "react";
import "../styling/HomePage.css";
import { io } from "socket.io-client";
import HomePage from "./HomePage";
import Lobby from "./Lobby";
import SocketApp from "./socketProvider";
import { Rooms } from "./rooms";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const socket = io("http://localhost:3000", { autoConnect: false });

  const initializeChat = () => {
    socket.connect();
    socket.emit("user_connected", username);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    socket.on("user_connected_message", (username) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${username} has joined`,
      ]);
    });
  }, [socket]);

  return (
    <div className="homePage">
      {isLoggedIn ? (
        <Lobby messages={messages} username={username} socket={socket} />
      ) : (
        <HomePage
          setUserName={setUsername}
          username={username}
          initializeChat={initializeChat}
        />
      )}
      < Rooms />

    </div>
  );
}

export default App;
