import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./context/socket-context";
import { UserProvider } from "./context/user-context";
import { RoomProvider } from "./context/room-context";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <UserProvider>
        <RoomProvider>
          <App />
        </RoomProvider>
      </UserProvider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
