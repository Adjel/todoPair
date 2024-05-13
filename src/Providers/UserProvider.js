import React, { createContext, useState } from "react";
import { auth, createUserWithEmailAndPassword } from "@/Firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  const handleRegister = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential.user);
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <UserContext.Provider value={{ user, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
}
