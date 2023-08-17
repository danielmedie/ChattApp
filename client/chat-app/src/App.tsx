import React, { useState } from 'react';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [rooms, setRooms] = useState<string[]>([]); // Lista över rum

  const handleUsernameSubmit = (submittedUsername: string) => {
    setUsername(submittedUsername);
    setCurrentRoom('lobby');
    // Här kan du ansluta till socket.io och andra initialiseringar
  };

  const handleRoomClick = (roomName: string) => {
    setCurrentRoom(roomName);
  };

  return (
    <div className="App">
      <h1>Chatt App</h1>
    </div>
  );
}

export default App;
