import React, { createContext, useContext, useState } from "react";

type RoomContextType = {
  room: string;
  setRoom: (room: string) => void;
  hasJoinedRoom: boolean;
  setHasJoinedRoom: (hasJoined: boolean) => void;
  users: string[];
};

type UserProp = {
  children: React.ReactNode;
};
const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error(" RoomContext must be used within a RoomProvider");
  }
  return context;
};

export const RoomProvider = ({ children }: UserProp) => {
  const [room, setRoom] = useState(""); //Tagit bort lobby som sträng
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <RoomContext.Provider
      value={{ room, setRoom, hasJoinedRoom, setHasJoinedRoom, users }}
    >
      {children}
    </RoomContext.Provider>
  );
};
