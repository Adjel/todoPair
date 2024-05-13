"use client";
import React, { createContext, useState } from "react";

export const UserContext = createContext("");

export default function UserProvider({ children }) {
  const [user, setUser] = useState("toe");

  const handleRegister = ({ email, password }) => {
    setUser(email);
  };

  return (
    <UserContext.Provider value={{ user, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
}
