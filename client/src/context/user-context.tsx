import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

interface UserProp {
  children: React.ReactNode;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("userContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: UserProp) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
